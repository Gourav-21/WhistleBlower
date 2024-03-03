import Card from "@/components/Card";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Post() {
    const [post, setPost] = useState([]);
    const router = useRouter()

    console.log(post)
  
    const getpost = async () => {
      const res = await axios.get("api/posts")
      setPost(res.data.posts)
    }
  
    useEffect(() => {
      getpost()
    }, [])
  
    return <>
      <button onClick={()=>{router.push('/addpost')}} >post</button>

      <div className="flex flex-col gap-2 p-4 pt-0">
        {post.map((item) => (
           <Card title={item.title} description={item.description} />
        ))}
      </div>
    </>
  }
  