import { COMMENT } from "@/db";
import dbConnect from "@/db/dbConnect";

export async function POST(req: Request) {
    await dbConnect();
    const { vote, id } = req.body
    await COMMENT.findByIdAndUpdate(id , { $inc: { vote: vote } })
  
    return Response.json({ message: "Comment added" })
  }