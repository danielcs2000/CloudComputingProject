import type { NextApiRequest, NextApiResponse } from 'next'


import aws from "aws-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    aws.config.update({
        accessKeyId: process.env.AMAZON_ACCESS_KEY,
        secretAccessKey: process.env.AMAZON_SECRET_KEY,
        region: process.env.AMAZON_REGION,
        signatureVersion: "v4",
    });

    const s3 = new aws.S3();

    const params: aws.S3.Types.HeadObjectRequest = {
        Bucket: process.env.AMAZON_BUCKET as string,
        Key: req.body.key,
    };

    try {
        await s3.headObject(params).promise();
        try {
            await s3.deleteObject(params).promise();
            return res.status(200).json({ message: "file deleted Successfully" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "ERROR in file Deleting : " + JSON.stringify(err) });
        }
    } catch (err: any) {
        return res
            .status(400)
            .json({ message: "File not Found ERROR : " + err.code });
    }
}