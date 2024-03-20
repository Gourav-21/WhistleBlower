import { COMMENT } from "@/db";
import dbConnect from "@/db/dbConnect";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
    await dbConnect();
    const { vote, id } = await req.json()
    await COMMENT.findByIdAndUpdate(id , { $inc: { vote: vote } })
    
    revalidateTag('posts')
    return Response.json({ message: "Comment added" })
  }