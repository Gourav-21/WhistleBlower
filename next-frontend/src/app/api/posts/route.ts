import { POST } from "@/db";
import dbConnect from "@/db/dbConnect";
import { post } from "@/store/posts";
import { unstable_noStore } from "next/cache";
import { SecretNetworkClient } from "secretjs";

type metadata={
  _id:string,
  date:string,
  vote:Number,
  comments:[]
}

interface data{
	posts:post[]
}

const query = async (query) => {
    
    let secretjs = new SecretNetworkClient({
		chainId: "pulsar-3",
		url: "https://api.pulsar.scrttestnet.com",
	});

	const my_query:data = await secretjs.query.compute.queryContract({
	  contract_address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
	  code_hash: process.env.NEXT_PUBLIC_CONTRACT_HASH,
	  query: query,
	});
  
	return my_query;
};

export async function GET(request: Request) {
	unstable_noStore();
    await dbConnect();
    const msg={ get_post: {} }
	const posts: data = await query(msg)

	const metadata:metadata[] = await POST.find().populate('comments');
	
	const mergedData = posts.posts.map(post => {
		const matchedData:metadata|undefined = metadata.find(data => data.date === post.date);
		const result = {
			id: matchedData?._id,
			date: post.date,
			title: post.title,
			description: post.description,
			vote:matchedData?.vote,
			comments:matchedData?.comments,
		};
		return result;	
	});

	return Response.json({ posts:mergedData})
}