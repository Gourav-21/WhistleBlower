// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { COMMENT, POST } from "@/db";
import dbConnect from "@/db/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    await dbConnect();
    const metadata = await POST.findOne({ date : req.body.date });
    const comment = {
        name: req.body.name,
        comment: req.body.comment,
        vote: 0,
        date: new Date()
    };
    const data=await COMMENT.create(comment);
    metadata.comments.push(data);
    await metadata.save();

    res.status(200).json({ message: "Comment added" });
}
