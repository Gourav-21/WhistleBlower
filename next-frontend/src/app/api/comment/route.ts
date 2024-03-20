import { COMMENT,POST as post } from "@/db";
import dbConnect from "@/db/dbConnect";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
    await dbConnect();
    const {date , name, comment }=await req.json()

    const metadata = await post.findOne({ date : date });
    const commentData = {
        name: name,
        comment: comment,
        vote: 0,
        date: new Date()
    };
    const data=await COMMENT.create(commentData);
    metadata.comments.push(data);
    await metadata.save();

    revalidateTag('posts')
    return Response.json({ message: "Comment added", id: data._id }); 
}