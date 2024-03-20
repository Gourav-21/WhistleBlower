import dbConnect from "@/db/dbConnect";
import { POST as post } from "@/db";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
    await dbConnect();
    const {id} = await req.json()
    await post.create({
        date:id,
        vote: 0,
    })
    
    revalidateTag('posts')
    return Response.json({ message: "post created successfully" })
  }