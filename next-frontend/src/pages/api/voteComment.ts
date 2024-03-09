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
  const {date , vote,id } = req.body
  await COMMENT.updateOne({date:date} , { $inc: { vote: vote } })

  res.status(200).json({ message: "Comment added" });
}
