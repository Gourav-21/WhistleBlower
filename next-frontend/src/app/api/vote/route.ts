import { POST as post } from "@/db";
import dbConnect from "@/db/dbConnect";
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  await dbConnect();
  revalidatePath('/post')
    const { date, vote } = await req.json()
    await post.updateOne({date:date} , { $inc: { vote: vote } })
  
    return Response.json({ message: "vote added" })
  }