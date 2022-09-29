// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from "../../../utils/prisma";
import {
  InputDistributionBodyPatch,
  OutputGetSingleDistribution,
} from "../../../types/distributions";
const prisma = PrismaClient;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id: string = req.query?.id as string;
    if (req.method === "GET") {
      const distribution = await prisma.distribution.findUnique({
        where: {
          id: id,
        },
      });

      const result = <OutputGetSingleDistribution>{
        id: distribution?.id,
        department: distribution?.department,
        province: distribution?.province,
        location: distribution?.location,
        elevation: distribution?.elevation,
        longitude: distribution?.longitude,
        latitude: distribution?.latitude,
        colector: distribution?.colector,
        colectionNumber: distribution?.colectionNumber,
        colectedAt: distribution?.colectedAt,
        herbarium: distribution?.herbarium,
        photoUrls: distribution?.photoUrls,
        aditionalNotes: distribution?.aditionalNotes,
      };

      return res.status(200).json(result);
    } else if (req.method === "DELETE") {
      const result = await prisma.distribution.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json(result);
    } else if (req.method === "PATCH") {
      const id: string = req.query?.id as string;
      let body = req.body;
      let data = <InputDistributionBodyPatch>body;
      console.log(data);
      const result = await prisma.distribution.update({
        where: {
          id: id,
        },
        data: {
          department: data.department,
          province: data.province,
          location: data.location,
          elevation: data.elevation,
          longitude: data.longitude,
          latitude: data.latitude,
          colector: data.colector,
          colectionNumber: data.colectionNumber,
          herbarium: data.herbarium,
          aditionalNotes: data.aditionalNotes,
          photoUrls: data.photoUrls,
        },
      });
      return res.status(200).json(result);
    }
  } catch (err: any) {
    return res.status(404).json({ statusCode: 404, message: err.message });
  }
}
