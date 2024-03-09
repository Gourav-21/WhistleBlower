// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { POST } from "@/db";
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
  const {date , vote } = req.body
  await POST.updateOne({date:date} , { $inc: { vote: vote } })

  res.status(200).json({ message: "Comment added" });
}
