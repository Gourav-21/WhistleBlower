import { secret } from "@/store/secret";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label";
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default function AddPost() {
  const { secretjs, address } = useRecoilValue(secret)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter()

  const execute = async (msg) => {
    try {
      let tx = await secretjs.tx.compute.executeContract(
        {
          sender: address,
          contract_address: "7f64fe73802569517b3c631d7e5f7bd67273b1865d031a388cef5dc0c3b35714",
          code_hash: "secret1rk6r0eqexvtswp7e4uudsrfka8rg3fs9537jv5", // optional but way faster
          msg: msg,
          sentFunds: [], // optional
        },
        {
          gasLimit: 100_000,
        }
      );
      console.log("executing...");
      alert("post added")
      router.push('/post')

    } catch (error) {
      alert("connect Wallet")
    }
  };


  async function handleSubmit() {
    try {
      //   const res=await axios.post("http://localhost:3000/addpost",{
      //     title,description
      //   },{
      //     headers: {
      //     "secret":JSON.stringify(secretjs),
      //   },
      // })
      // alert(res.data);
      const msg = { create_post: { title: title, description: description } }
      await execute(msg)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex justify-center mt-10">
    <Card className="w-[550px]">
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
      <Textarea rows={6}  value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)}  placeholder="Type your message here." id="message" />
    </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
      <Button className={"w-20"} onClick={handleSubmit}>post</Button>
      </CardFooter>
    </Card>
  </div>
  )
}
