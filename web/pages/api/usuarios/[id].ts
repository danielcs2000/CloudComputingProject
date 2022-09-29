// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from "../../../utils/prisma";
import {
    Role
} from "../../../types/users";
import { Roles } from "../../../types/role";
const prisma = PrismaClient;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id: string = req.query?.id as string;
  if (req.method === "DELETE") {
      const result = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json(result);
    } else if (req.method === "PATCH") {
      const id: string = req.query?.id as string;
      let body = req.body;
      let data = <Role>body;
      const rol : Roles = data.role as Roles;
      console.log(data);
      const result = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
            role: rol,
        },
      });
      return res.status(200).json(result);
    }
  } catch (err: any) {
    return res.status(404).json({ statusCode: 404, message: err.message });
  }
}