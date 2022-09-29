// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from "../../../utils/prisma";
import { InputSpeciesBodyPost, InputSpeciesBodyPut } from "../../../types/species";

const prisma = PrismaClient;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      // TODO create a species
      let body = req.body;
      let data = <InputSpeciesBodyPost>body;

      const result = await prisma.species.create({
        data: data,
      });
      return res.status(200).json(result);
    } else if (req.method === "GET") {
      // return all species
      const subFamilyId: string = req.query?.subFamilyId as string;
      const tribeId: string = req.query?.tribeId as string;
      const genreId: string = req.query?.genreId as string;

      var filter = {};

      if (genreId !== "") {
        filter = {
          where: {
            genreId: genreId,
          },
        };
      } else if (tribeId !== "") {
        filter = {
          where: {
            genre: {
              tribeId: tribeId,
            },
          },
        };
      } else if (subFamilyId !== "") {
        filter = {
          where: {
            genre: {
              tribe: {
                subFamilyId: subFamilyId,
              },
            },
          },
        };
      }

      const result = await prisma.species.findMany(filter);
      return res.status(200).json(result);
    }
    return res.status(405).json({ errorMessage: "Method not allowed" });
  } catch (err: any) {
    console.log(err);
    return res.status(404).json({ statusCode: 404, message: err.message });
  }
}
