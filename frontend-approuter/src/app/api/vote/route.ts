import { POST as post } from "@/db";
import dbConnect from "@/db/dbConnect";

export async function POST(req: Request) {
    await dbConnect();
    const { date, vote } = await req.json()
    await post.updateOne({date:date} , { $inc: { vote: vote } })
  
    return Response.json({ message: "vote added" })
  }