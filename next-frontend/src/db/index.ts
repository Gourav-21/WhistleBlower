import mongoose from "mongoose";

const POSTSchema = new mongoose.Schema({
  date: String,
  vote: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "COMMENT" }],
});

const COMMENTSchema = new mongoose.Schema({
  name: String,
  comment: String,
  vote: Number,
  date: String
})

export const POST =  mongoose.models.POST || mongoose.model("POST", POSTSchema);
export const COMMENT =  mongoose.models.COMMENT || mongoose.model("COMMENT", COMMENTSchema);
