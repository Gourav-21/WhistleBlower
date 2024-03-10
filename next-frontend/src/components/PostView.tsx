import { postState } from "@/store/currentPost";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Image from "next/image";
import Comments from "./Comments";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import format from "date-fns/format"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { commentState } from "@/store/comments";
import VoteAndComment from "./VoteAndComment";
import { useToast } from "./ui/use-toast";
import { defaultPost, postsAtom } from "@/store/posts";
import { postAtomFamily } from "@/store/postAtomFamily";
import { sortByLikesInPlace, sortByNewestInPlace } from "@/components/functions";
import ConnectWallet from "./ConnectWallet";

export default function PostView(){
    const date=useRecoilValue(postState);
    const post=useRecoilValue(postAtomFamily(date)) || defaultPost;
    const setCommentState= useSetRecoilState(commentState)
    
    const setPosts = useSetRecoilState(postAtomFamily(date));
    const { toast } = useToast()
    const [comments, setComments] = useState("");

    useEffect(() => {
      setCommentState(post.comments)
      sortByNewestInPlace(post.comments,setCommentState)
    }, [post])
    
    return(
      <div className="flex h-full w-full flex-col z-0">
        {post.title ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <div className="grid gap-1">
                  <div className="font-semibold text-xl">{post.title}</div>
                </div>
              </div>
              {post.date && (
                <div className="ml-auto text-xs text-muted-foreground">
                  {format(new Date(post.date), "PP")}
                </div>
              )}
            </div>
            {/* <Separator /> */}
            <div className="flex-1 whitespace-pre-line p-4 text-sm -mt-4">
              {post.description}
            </div>
            <VoteAndComment date={post.date} className={" ml-4"}/>
            <Separator className="mt-4" />
  
            <div className="p-4">
                <div className="grid gap-4">
                  <Textarea
                    className="p-4"
                    onChange={(e) => setComments(e.target.value)}
                    value={comments}
                    placeholder={`Add a comment`}
                  />
                  <div className="flex items-center">
                  {post.comments[0]? (

                      <Tabs defaultValue="Newest">

                          <TabsList className="ml-auto">
                              <TabsTrigger value="Most Liked" onClick={() => { sortByLikesInPlace(post.comments,setCommentState) }} className="text-zinc-600 dark:text-zinc-200">Most Liked</TabsTrigger>
                              <TabsTrigger value="Newest" onClick={() => {sortByNewestInPlace(post.comments,setCommentState) }} className="text-zinc-600 dark:text-zinc-200">Newest</TabsTrigger>
                          </TabsList>
                      </Tabs>

                  ) : (
                    <Label className="flex items-center gap-2 text-xs font-normal">No comments yet</Label>
                  )}
                    
                  <Button
                    onClick={async () => {
                      if (!comments) {
                        toast({
                          variant: "destructive",
                          description: "⚠️ Comment cannot be empty",
                        })
                        return;
                      }
                      try {
                        const res = await axios.post("/api/comment", {
                          date: post.date,
                          comment: comments,
                          name:localStorage.getItem("SecretName")
                        });
                          toast({
                            description: "Comment added successfully",
                          })
                          setComments("");
                          const newComment={
                            name:localStorage.getItem("SecretName"),
                            comment: comments,
                            date: new Date().toISOString(),
                            vote: 0,
                          }
                          
                          setPosts((prev)=>{
                            let newData={...prev};
                            newData = {
                              ...newData,
                              comments: [...newData.comments, newComment],
                            };
                            return newData;
                          })
                      } catch (e) {
                        console.log(e)
                        toast({
                          variant: "destructive",
                          description: "⚠️ Something went wrong",
                        })
                      }
                    }}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                  </div>
                </div>
            </div>
            <Separator />
            <Comments id={post.date}/>
  
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground flex justify-center flex-col">
            {/* No message selected */}
            <Image src={"/whitsle.svg"} alt="Empty" width={250} height={200} className="m-auto mt-10" />
            <p className="text-xl mt-4">Welcome to WhistleBlower</p>
            <div className="mt-5">
            <ConnectWallet/>
            </div>
          </div>
        )}
      </div>
    )
  }
  
