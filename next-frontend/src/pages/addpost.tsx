import { secret } from "@/store/secret";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/ui/button"


export default function AddPost(){
    const {secretjs,address} =useRecoilValue(secret)
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
  
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
      } catch (error) {
        alert("connect Wallet")
      }
    };
      
  
    async function handleSubmit(){
      try{
      //   const res=await axios.post("http://localhost:3000/addpost",{
      //     title,description
      //   },{
      //     headers: {
      //     "secret":JSON.stringify(secretjs),
      //   },
      // })
      // alert(res.data);
        const msg={ create_post: { title: title , description: description }}
            await execute(msg)
      }catch(e){
        console.log(e)
      }
    }
  
    return<>
    <div className="flex justify-center flex-col m-10">

      <input className="resize text-2xl" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="" id="" />
      <input value={description} placeholder="description" onChange={(e)=>setDescription(e.target.value)} type="text" name="" id="" />
      <Button variant="outline" onClick={handleSubmit}>post</Button>
    </div>
    </>
  }
  