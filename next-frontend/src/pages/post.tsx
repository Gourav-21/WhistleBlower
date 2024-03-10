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
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { post, postsAtom } from "@/store/posts";
import { searchPosts, sortByLikesInPlace, sortByNewestInPlace } from "../components/functions";
import { walletState } from "@/store/walletConnected";
import { postState } from "@/store/currentPost";
import { useToast } from "@/components/ui/use-toast";

export default function Post() {
    const [post, setPost] = useRecoilState(postsAtom);
    const[showAddpost, setShowAddpost] = useState(false);
    const isConnected= useRecoilValue(walletState);
    const setPostState=useSetRecoilState(postState);
    const { toast } = useToast()

    const getpost = async () => {
      const res = await axios.get("api/posts")
      setPost(res.data.posts)
      // console.log(res.data.posts)
      // setPost(posts)
    }
  
    useEffect(() => {
      getpost()
      // setPost(posts)
    }, [])
  
  return <div className="flex h-screen w-screen">
    <ResizablePanelGroup direction="horizontal">
    <ResizablePanel minSize={30}>

        <Tabs defaultValue="all ">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Secrets</h1>
            <div className="ml-auto">

              <TabsList className="ml-auto">
                <TabsTrigger value="Most Liked" onClick={() => { sortByLikesInPlace(post,setPost) }} className="text-zinc-600 dark:text-zinc-200">Most Liked</TabsTrigger>
                <TabsTrigger value="Newest" onClick={() => { sortByNewestInPlace(post,setPost) }} className="text-zinc-600 dark:text-zinc-200">Newest</TabsTrigger>
              </TabsList>
              <Button variant="secondary" onClick={() => { setShowAddpost((value) => !value) }} className="ml-2 "  >Add Post</Button>
            </div>
          </div>

          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Button onClick={(e) => { e.preventDefault(); setShowAddpost((value) => !value) }} className="absolute right-0 top-0" variant="outline"  >Add Post</Button>
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" onChange={(e) => { searchPosts(e.target.value, post, setPost,getpost) }} className="pl-8" />
              </div>
            </form>
          </div>
        </Tabs>

        <Separator />
        <ScrollArea className="h-full">
          <div className="flex justify-center">

          <div onClick={() => { setShowAddpost(false) }} className="flex flex-col gap-2 p-4  max-w-3xl">
            {post.map((item) => (
                <Card key={item.id} title={item.title} description={item.description} date={item.date} vote={item.vote} comments={item.comments} />
            ))}
          </div>
          </div>

        </ScrollArea>

      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40} minSize={30} className={cn("flex justify-center min-w-[50px] transition-all duration-300 ease-in-out")}>

      <ScrollArea className="max-w-3xl grow">

        {showAddpost ? (
          isConnected ?  
          <AddPostside onClose={() => { setShowAddpost(false) }} />
          :
          (
          <>{toast({ variant: "destructive",
            title: "Connect Wallet",
            description: "Connect your wallet to add a post.",
          })}
            {setPostState("")};
            {setShowAddpost(false)};
          </>
          )
        ) : <PostView />}

      </ScrollArea>
      </ResizablePanel>

    </ResizablePanelGroup>
  </div>
}


// export async function getStaticProps() {
//   const res = await axios.get('/api/posts')
//   // const data = await res.json()
//   const posts = res.data.posts
 
//   return {
//     props: {
//       posts,
//     },
//   }
// }
  