import axios from "axios";
import Post from "./post";

async function getpost(){
  const res = await axios.get("https://secretwhistleblower.vercel.app/api/posts")
  return res.data.posts;
}

export default async function Page() {
  const posts = await getpost();

  return (
      <>
        <Post posts={posts} />
      </>
  );
}