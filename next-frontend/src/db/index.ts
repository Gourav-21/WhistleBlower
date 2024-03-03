import mongoose from "mongoose";

const POSTSchema = new mongoose.Schema({
  id: String,
  likes: Number,
  dislikes: Number,
  comments: [{name:String,comment:String}],
});

export const POST =  mongoose.models.POST || mongoose.model("POST", POSTSchema);
