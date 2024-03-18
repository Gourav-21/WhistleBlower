"use client"

import Card from "@/components/postCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddPostside from "@/components/addpost";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import PostView from "@/components/PostView";
import { cn } from "@/lib/utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { post, postsAtom } from "@/store/posts";
import { postState } from "@/store/currentPost";
import { searchPosts, sortByLikesInPlace, sortByNewestInPlace } from "@/components/functions";

export default function Post({ posts }: { posts: post[] }) {
  const [post, setPost] = useRecoilState(postsAtom);
  const [resetPost, setResetPost] = useState<post[]>([])
  const [showAddpost, setShowAddpost] = useState(false);
  const poststate = useRecoilValue(postState);

  function reset() {
    setPost([...resetPost])
  }

  useEffect(() => {
    setPost(posts)
    setResetPost(posts)
  }, [])

  return <div className="flex h-screen w-screen">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={30} className={`${(poststate != "" || showAddpost) ? "hidden" : "block"} md:block`}>

        <Tabs defaultValue="all ">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Secrets</h1>
            <div className="ml-auto">

              <TabsList className="ml-auto">
                <TabsTrigger value="Most Liked" onClick={() => { sortByLikesInPlace(post, setPost) }} className="text-zinc-600 dark:text-zinc-200">Most Liked</TabsTrigger>
                <TabsTrigger value="Newest" onClick={() => { sortByNewestInPlace(post, setPost) }} className="text-zinc-600 dark:text-zinc-200">Newest</TabsTrigger>
              </TabsList>
              {/* <Button variant="secondary" onClick={() => { setShowAddpost((value) => !value) }} className="ml-2 hidden md:inline">Add Post</Button> */}
            </div>
          </div>

          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Button onClick={(e) => { e.preventDefault(); setShowAddpost((value) => !value) }} className="absolute right-0 top-0" variant="outline"  >Add Post</Button>
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" onChange={(e) => { searchPosts(e.target.value, post, setPost, reset) }} className="pl-8" />
              </div>
            </form>
          </div>
        </Tabs>

        <Separator />
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="flex justify-center">

            <div onClick={() => { setShowAddpost(false) }} className="flex flex-col gap-2 p-4">
              {post.map((item) => (
                <div key={item.id}>
                  <Card key={item.id} title={item.title} description={item.description} date={item.date} vote={item.vote} comments={item.comments} />
                  <Separator className="mt-2" />
                </div>
              ))}
            </div>
          </div>

        </ScrollArea>

      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40} minSize={30} className={cn(`flex justify-center min-w-[50px] transition-all duration-300 ease-in-out overflow-scroll md:flex`, (poststate != "" || showAddpost) ? "flex" : "hidden")}>

        <ScrollArea className="max-w-3xl grow">

          {showAddpost ? <AddPostside onClose={() => { setShowAddpost(false) }} /> : <PostView />}

        </ScrollArea>
      </ResizablePanel>

    </ResizablePanelGroup>
  </div>
}