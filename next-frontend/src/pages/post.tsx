import Card from "@/components/postCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import AddPostside from "@/components/addpostside";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import PostView from "@/components/PostView";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRecoilState } from "recoil";
import { post, postsAtom } from "@/store/posts";
import { searchPosts, sortByLikesInPlace, sortByNewestInPlace } from "../components/functions";

const posts: post[] = [
  {
    "title": "Corruption in Finance Sector",
    "description": "Uncover deep-rooted financial misconduct in major institutions. Your voice matters in exposing fraudulent activities that jeopardize the integrity of the financial sector. Share your insights on questionable transactions, insider trading, or any unethical practices that compromise the trust of investors and the public. Anonymously report with confidence, knowing that your identity is safeguarded through our state-of-the-art encryption powered by Secret smart contracts. Together, let's foster transparency and accountability in the finance industry. Reporting date: 2024-03-04. Likes: 25.",
    "date": "2024-03-04T15:50:43.514Z",
    "vote": 25,
    "comments": [
      {"name": "Anonymous1", "comment": "Great initiative!", "date": "2024-03-04T15:55:43.514Z", "vote": 5},
      {"name": "Anonymous2", "comment": "This is much needed.", "date": "2024-03-04T15:57:43.514Z", "vote": 3},
      {"name": "Anonymous3", "comment": "Hope it leads to positive changes.", "date": "2024-03-04T15:59:43.514Z", "vote": 2}
    ]
  },
  {
    "title": "Environmental Violations",
    "description": `Contribute to the fight against environmental degradation by reporting anonymously on companies engaged in harmful practices. 

            Your whistleblowing can expose activities that lead to pollution, deforestation, or other forms of environmental harm. We believe in the power of individuals to drive positive change.
                                    
            By submitting your concerns confidentially, you play a vital role in holding corporations accountable for their impact on the planet. Every report contributes to a cleaner, healthier environment for future generations. 
            
            Reporting date: 2024-03-03. Likes: 12.`,
    "date": "2024-03-03T16:30:43.514Z",
    "vote": 12,
    "comments": [
      {"name": "Anonymous4", "comment": "Important cause.", "date": "2024-03-03T16:35:43.514Z", "vote": 4},
      {"name": "Anonymous5", "comment": "I hope this brings awareness.", "date": "2024-03-03T16:40:43.514Z", "vote": 2},
      {"name": "Anonymous6", "comment": "Keep up the good work!", "date": "2024-03-03T16:45:43.514Z", "vote": 1}
    ]
  },
  {
    "title": "Workplace Harassment",
    "description": "Expose workplace harassment incidents without revealing your identity. If you've witnessed or experienced harassment at work, use this platform to share your story and bring attention to this pervasive issue. Your voice can empower others to speak out and create a safer workplace for all. Our commitment to anonymity ensures that you can report confidently, free from fear of retaliation. Together, let's build workplaces where everyone feels respected and protected. Reporting date: 2024-03-02. Likes: 18.",
    "date": "2024-03-02T17:20:43.514Z",
    "vote": 18,
    "comments": [
      {"name": "Anonymous7", "comment": "Thank you for addressing this.", "date": "2024-03-02T17:25:43.514Z", "vote": 3},
      {"name": "Anonymous8", "comment": "Courageous step to share.", "date": "2024-03-02T17:30:43.514Z", "vote": 2},
      {"name": "Anonymous9", "comment": "Hope it sparks positive change.", "date": "2024-03-02T17:35:43.514Z", "vote": 1}
    ]
  },
  {
    "title": "Government Misconduct",
    "description": "Anonymously blow the whistle on government officials involved in corruption. If you've witnessed misuse of power, bribery, or any form of unethical behavior within the government, your report can contribute to accountability and transparency. We understand the importance of protecting your identity, and our cutting-edge encryption ensures the confidentiality of your information. Together, let's strive for a government that serves the public interest with integrity. Reporting date: 2024-03-01. Likes: 30.",
    "date": "2024-03-01T18:10:43.514Z",
    "vote": 30,
    "comments": [
      {"name": "Anonymous10", "comment": "This is crucial.", "date": "2024-03-01T18:15:43.514Z", "vote": 5},
      {"name": "Anonymous11", "comment": "I hope this brings change.", "date": "2024-03-01T18:20:43.514Z", "vote": 3},
      {"name": "Anonymous12", "comment": "Government accountability matters.", "date": "2024-03-01T18:25:43.514Z", "vote": 2}
    ]
  },
  {
    "title": "Healthcare Fraud",
    "description": "Combat healthcare fraud by anonymously reporting deceptive practices within the medical industry. Your insights can expose fraudulent billing, insurance scams, or any form of misconduct that undermines the trust in healthcare services. Through this secure platform, you can make a significant impact on the integrity of healthcare systems. Rest assured, your identity is protected through our advanced encryption technology. Reporting date: 2024-02-29. Likes: 15.",
    "date": "2024-02-29T19:00:43.514Z",
    "vote": 15,
    "comments": [
      {"name": "Anonymous13", "comment": "Healthcare integrity is crucial.", "date": "2024-02-29T19:05:43.514Z", "vote": 4},
      {"name": "Anonymous14", "comment": "Hope this leads to positive changes.", "date": "2024-02-29T19:10:43.514Z", "vote": 2},
      {"name": "Anonymous15", "comment": "Thank you for addressing this issue.", "date": "2024-02-29T19:15:43.514Z", "vote": 1}
    ]
  },
  {
    "title": "Tech Industry Ethics",
    "description": "Promote ethical practices in the tech industry by anonymously reporting misconduct and questionable practices. Whether it's data privacy concerns, unfair competition, or other ethical lapses, your whistleblowing can drive positive change. Use this platform to voice your concerns and contribute to a tech industry that prioritizes integrity and user trust. Reporting date: 2024-02-28. Likes: 22.",
    "date": "2024-02-28T20:30:43.514Z",
    "vote": 22,
    "comments": [
      {"name": "Anonymous16", "comment": "Tech ethics matter.", "date": "2024-02-28T20:35:43.514Z", "vote": 5},
      {"name": "Anonymous17", "comment": "Hope companies take notice.", "date": "2024-02-28T20:40:43.514Z", "vote": 3},
      {"name": "Anonymous18", "comment": "Your voice makes a difference.", "date": "2024-02-28T20:45:43.514Z", "vote": 2}
    ]
  }
];

export default function Post() {
    const [post, setPost] = useRecoilState(postsAtom);
    const[showAddpost, setShowAddpost] = useState(false);

    const router = useRouter()

    const getpost = async () => {
      const res = await axios.get("api/posts")
      setPost(res.data.posts)
      console.log(res.data.posts)
      // setPost(posts)
    }
  
    useEffect(() => {
      getpost()
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

          {/* <Separator /> */}

          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Button onClick={(e) => { e.preventDefault(); router.push('/addpost') }} className="absolute right-0 top-0" variant="outline"  >Add Post</Button>
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

        {showAddpost ? <AddPostside onClose={() => { setShowAddpost(false) }} /> : <PostView />}

      </ScrollArea>
      </ResizablePanel>

    </ResizablePanelGroup>
  </div>
}


// export async function getStaticProps() {
//   const res = await fetch('api/posts')
//   const data = await res.json()
//   const post = data.posts
 
//   return {
//     props: {
//       post,
//     },
//   }
// }
  