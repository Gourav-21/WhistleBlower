import { cn } from "@/lib/utils";
import { postAtomFamily } from "@/store/postAtomFamily";
import { Vote } from "@/store/vote";
import axios from "axios";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function VoteAndComment({date, className}){
  const [loading,setLoading]=useState(false);
  const [post, setPost] =useRecoilState(postAtomFamily(date))
  const [vote, setVote] = useRecoilState(Vote(date));

  async function submit(date,vote) {
    await axios.post("/api/vote", {
      date: date,
      vote: vote,
    });
    
    setPost((prev) => ({
      ...prev,
      vote: prev.vote + vote,
    }));
  }

  const handleVote = async (newVote) => {
    if(loading){
      setLoading(false);
      return
    }
    setLoading(true)
    let submitVote;
    if (vote == newVote) {
      await submit(date, -(newVote))
      setVote(0);
      localStorage.removeItem(date);
      return;
    } else if (vote == -1 && newVote == 1) {
      submitVote=2
    } else if (vote == 1 && newVote == -1) {
      submitVote=-2
    }else{
      submitVote=newVote
    }

    await submit(date, submitVote)
    setVote(newVote);
    localStorage.setItem(date, newVote);
    setLoading(false)
  }

    return(
        <div className={cn("flex text-xs items-center gap-5 mt-2 ",className)}>

        <div className="flex gap-2 items-center ">
          <ThumbsUp onClick={() => handleVote(1)} className={`hover:stroke-green-500 text-muted-foreground w-4 h-4 ${vote==1 ? 'stroke-green-500' : ''}`} />
          <span>{post.vote}</span>
          <ThumbsDown onClick={() => handleVote(-1)} className={`hover:stroke-red-500 text-muted-foreground w-4 h-4 ${vote==-1 ? 'stroke-red-500' : ''}`} />
        </div>

        <div className="flex gap-2 items-center">
          <MessageCircle className="hover:stroke-blue-500 text-muted-foreground w-4 h-4" />
          <span>{post.comments? post.comments.length:0}</span>
        </div>

      </div>
    )

}