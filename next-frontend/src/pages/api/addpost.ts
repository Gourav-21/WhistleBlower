// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/dbConnect";
import { CARD, POST } from "@/db";
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
    await CARD.create({
        date:id,
        title: title,
        description: description,
    })
    res.json({ message: "post created successfully" });
}

