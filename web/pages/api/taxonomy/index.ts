import type { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from "../../../utils/prisma";
import { InputSpeciesBodyPost } from "../../../types/species";

const prisma = PrismaClient;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      // GET taxonomy tree
      const result = await prisma.family.findUnique({
        where: {
          name: "Cactaceae",
        },
        select: {
          name: true,
          subFamilies: {
            select: {
              id: true,
              name: true,
              tribes: {
                select: {
                  id: true,
                  name: true,
                  genres: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const subfamilies:any = result?.subFamilies;
      subfamilies.map((item:any) => {
        item.value = item.id;
        delete item.id;
        item.label = item.name;
        delete item.name;
        item.tribes.map((item:any) => {
          item.value = item.id;
          delete item.id;
          item.label = item.name;
          delete item.name;
          item.genres.map((item:any) => {
            item.value = item.id;
            delete item.id;
            item.label = item.name;
            delete item.name;
          });
        });
      });

      return res.status(200).json(subfamilies);
    }
    return res.status(405).json({ errorMessage: "Method not allowed" });
  } catch (err: any) {
    return res.status(404).json({ statusCode: 404, message: err.message });
  }
}