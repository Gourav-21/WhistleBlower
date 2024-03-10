// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/dbConnect";
import { POST } from "@/db";
type Data = {
    message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    await dbConnect();
    const {title, description,id} = req.body
    await POST.create({
        date:id,
        vote: 0,
    })

    res.json({ message: "post created successfully" });
}

