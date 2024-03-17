import { COMMENT,POST as post } from "@/db";
import dbConnect from "@/db/dbConnect";

export async function POST(req: Request) {
    await dbConnect();
    const metadata = await post.findOne({ date : req.body.date });
    const comment = {
        name: req.body.name,
        comment: req.body.comment,
        vote: 0,
        date: new Date()
    };
    const data=await COMMENT.create(comment);
    metadata.comments.push(data);
    await metadata.save();
   
    return Response.json({ message: "Comment added" })
  }