import { POST } from "@/db";
import dbConnect from "@/db/dbConnect";
import { post } from "@/store/posts";
import { SecretNetworkClient } from "secretjs";

interface data{
	posts:post[]
}

const query = async (query) => {
    
    let secretjs = new SecretNetworkClient({
		chainId: "pulsar-3",
		url: "https://api.pulsar.scrttestnet.com",
	});

	const my_query = await secretjs.query.compute.queryContract({
	  contract_address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
	  code_hash: process.env.NEXT_PUBLIC_CONTRACT_HASH,
	  query: query,
	});
  
	return my_query;
};

export async function GET(request: Request) {
    await dbConnect();
    const msg={ get_post: {} }
	const posts: data = await query(msg)

	const metadata = await POST.find().populate('comments');
	
	const mergedData = posts.posts.map(post => {
		const matchedData = metadata.find(data => data.date === post.date);
		const result = {
			id: matchedData._id,
			date: post.date,
			title: post.title,
			description: post.description,
			vote:matchedData.vote,
			comments:matchedData.comments,
		};
		return result;	
	});
   console.log(mergedData)
    return Response.json({ posts:mergedData})
}