import Post from "./post";

async function getpost(){
  const res = await fetch('https://secretwhistleblower.vercel.app/api/posts', { cache: 'no-store' })
  const data= await res.json();
  return data.posts;
};

export default async function Page() {
  const posts = await getpost();

  return (
      <>
        <Post posts={posts} />
      </>
  );
}