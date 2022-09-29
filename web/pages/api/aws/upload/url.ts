import type { NextApiRequest, NextApiResponse } from 'next'

import aws from "aws-sdk";
function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    aws.config.update({
        accessKeyId: process.env.AMAZON_ACCESS_KEY,
        secretAccessKey: process.env.AMAZON_SECRET_KEY,
        region: process.env.AMAZON_BUCKET_REGION,
        signatureVersion: "v4",
    });
    const { body } = req;

    const s3 = new aws.S3();
    const post = await s3.createPresignedPost({
        Bucket: process.env.AMAZON_BUCKET,
        Fields: {
            key: `${process.env.VERCEL_ENV}/${uuid()}/${body.file}`,
            "Content-Type": body.fileType,
        },
        Expires: 60, // seconds
        Conditions: [
            ["content-length-range", 0, 5 * 1024 ** 2], // up to 5 MB
        ],
    });

    return res.status(200).json(post);
}