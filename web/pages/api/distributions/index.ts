// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaClient from '../../../utils/prisma';
import { InputDistributionBodyPost } from '../../../types/distributions'

const prisma = PrismaClient;



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {

            let body = req.body;
            let data = <InputDistributionBodyPost>(body);
            const result = await prisma.distribution.create({
                data: data,
            })
            return res.status(200).json(result)
        } else if (req.method === 'GET') {
            // return all species
            const speciesId: string = req.query?.speciesId as string;

            const result = await prisma.distribution.findMany({
                where: {
                    speciesId: speciesId
                }
            });
            return res.status(200).json(result)
        }
        return res.status(405).json({ errorMessage: 'Method not allowed' })

    } catch (err: any) {
        return res.status(404).json({ statusCode: 404, message: err.message })
    }

}
