import { secret } from "@/store/secret";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label";
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { postsAtom } from "@/store/posts";
import { useToast } from "./ui/use-toast";


export default function AddPostside(props) {
  const setPosts = useSetRecoilState(postsAtom);
  const { toast } = useToast()

  const { secretjs, address } = useRecoilValue(secret)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter()

  const execute = async (msg) => {
    try {
      let tx = await secretjs.tx.compute.executeContract(
        {
          sender: address,
          contract_address: process.env.contractAddress,
          code_hash: process.env.contractCodeHash, // optional but way faster
          msg: msg,
          sentFunds: [], // optional
        },
        {
          gasLimit: 100_000,
        }
      );
      console.log("executing...");
      alert("post added")
      // router.push('/post')

    } catch (error) {
      alert("connect Wallet")
    }
  };


  async function handleSubmit() {
    const id = new Date();
    const msg = { create_post: { title: title, description: description, date: id } }
    await execute(msg)
    const res = await axios.post("api/addpost", {
      title, description, id
    })
    toast({
      description: res.data.message,
    })
    const newPost = {
      date: id,
      title: title,
      description: description,
      vote:0,
      comments:[]
    }
    setPosts((prev) => [...prev, newPost])
    

  }

  return (
    <div className="flex w-full justify-center">
    <Card className="grow z-20 h-screen rounded-none border-none">
      <CardHeader>
        <CardTitle>Create post</CardTitle>
        <CardDescription>Whistleblow Anonymously</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
      </div>
      <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea rows={8}  value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Type your message here." id="message" />
    </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={()=>{props.onClose()}}>Cancel</Button>
      <Button className={"w-20"} onClick={handleSubmit}>post</Button>
      </CardFooter>
    </Card>
  </div>
  )
}
