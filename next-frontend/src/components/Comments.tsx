import { cn } from "@/lib/utils";
import { commentState } from "@/store/comments";
import { Separator } from "@radix-ui/react-separator";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ChevronDown, ChevronDownSquare, ChevronUp, ChevronUpSquare, Ghost } from "lucide-react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { generateRandomColorHexCode } from "./functions";
import { useEffect, useState } from "react";
import axios from "axios";
import { postAtomFamily } from "@/store/postAtomFamily";

export default function Comments({id}) {
  const comments = useRecoilValue(commentState);

  return (
    <div className="flex flex-col gap-4 p-4">
      {comments.map((comment) => (
        <Comment key={comment._id} id={id} comment={comment} color={generateRandomColorHexCode()} />
      ))}
    </div>
  )
}

function Comment({ comment, color ,id}) {
  const [loading,setLoading]=useState(false);
  const date = comment.date;
  const setPost = useSetRecoilState(postAtomFamily(id));
  const [vote, setVote] = useState(localStorage.getItem(date)||0)
  
  async function submit(date,vote) {

    await axios.post("/api/voteComment", {
      vote: vote,
      id:comment._id
    });

    setPost((prev)=> {
      const index=prev.comments.findIndex(comment=>comment.date==date)
      const updatedcomment=[...prev.comments]
      updatedcomment[index]={
        ...updatedcomment[index],
        vote: updatedcomment[index].vote+vote
      };
      return {...prev,comments:updatedcomment}
    })
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
  return (
    <div className="grid grid-cols-12 gap-1">

      <div className="flex col-span-1 justify-center items-start  gap-4 text-sm">
        <Ghost stroke={color} />
      </div>

      <div className="col-span-11 grid gap-2">
        <div className="flex">
          <div className="font-semibold text-sm">{comment.name}</div>
          <div className={cn("ml-auto text-xs",)}>
            {comment.date && formatDistanceToNow(new Date(comment.date), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="text-xs whitespace-pre-line text-muted-foreground">{comment.comment}</div>
        {/* <div className="flex gap-2 items-center ">
          <ChevronUpSquare onClick={() => handleVote(1)} className={`hover:stroke-green-500 text-muted-foreground w-4 h-4 ${vote==1 ? 'stroke-green-500' : ''}`} />
          <span>{comment.vote}</span>
          <ChevronDownSquare onClick={() => handleVote(-1)} className={`hover:stroke-red-500 text-muted-foreground w-4 h-4 ${vote==-1 ? 'stroke-red-500' : ''}`} />
        </div> */}
        <div className="flex gap-2 items-center ">
              <ChevronUp onClick={() => handleVote(1)} className={`hover:stroke-green-500 text-muted-foreground w-4 h-4 ${vote==1 ? 'stroke-green-500' : ''}`} />
               <span>{comment.vote}</span>
              <ChevronDown onClick={() => handleVote(-1)} className={`hover:stroke-red-500 text-muted-foreground w-4 h-4 ${vote==-1 ? 'stroke-red-500' : ''}`} />
          </div>
      </div>
      <div className="col-span-12 mt-2">
        <Separator />
      </div>
    </div>
  )

}
