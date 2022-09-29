// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from "../../../utils/prisma";
import {
  InputSpeciesBodyPatch,
  OutputGetSingleSpecies,
} from "../../../types/species";
const prisma = PrismaClient;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id: string = req.query?.id as string;
    if (req.method === "GET") {
      // TODO get a species by its id
      const species = await prisma.species.findUnique({
        include: {
          genre: {
            include: {
              tribe: {
                include: {
                  subFamily: {
                    include: {
                      family: true,
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          id: id,
        },
      });
      const distributions = await prisma.distribution.findMany({
        where: {
          speciesId: id,
        },
      });

      let distributionsData: { position: [number, number], text: string }[] = [];
      let distributionFrequency: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


      distributions.map((distribution) => {
        let popUpText = distribution.colector + " " + distribution.colectionNumber + " (" + distribution.herbarium + ")";
        distributionsData.push({ position: [distribution.latitude, distribution.longitude], text: popUpText });

        var month = distribution.colectedAt.getMonth() - 1;
        distributionFrequency[month] += 1;
      }
      );

      const result = <OutputGetSingleSpecies>{
        id: species?.id,
        name: species?.name,
        names: species?.names,
        morphology: species?.morphology,
        habitad: species?.habitad,
        iucnCode: species?.iucnCode,
        iucnUrl: species?.iucnUrl,
        citiesCode: species?.citiesCode,
        citiesUrl: species?.citiesUrl,
        nationalNormative: species?.nationalNormative,
        observation: species?.observation,
        photoUrls: species?.photoUrls,
        genre_name: species?.genre.name,
        tribe_name: species?.genre.tribe.name,
        subfamily_name: species?.genre.tribe.subFamily.name,
        family_name: species?.genre.tribe.subFamily.family.name,
        number_obs: distributions.length,
        dataObs: distributionsData,
        departaments: species?.departments,
        distributionFrequency: distributionFrequency,
      };

      return res.status(200).json(result);
    } else if (req.method === "DELETE") {
      const result = await prisma.species.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json(result);
    } else if (req.method === "PUT") {
      // TODO update a species
      const id: string = req.query?.id as string;
      let body = req.body;
      let data = <InputSpeciesBodyPatch>body;
      console.log("put", id, data);

      const result = await prisma.species.update({
        where: {
          id: id,
        },
        data: data,
      });
      return res.status(200).json(result);
    }
  } catch (err: any) {
    console.log(err);
    return res.status(404).json({ statusCode: 404, message: err.message });
  }
}
