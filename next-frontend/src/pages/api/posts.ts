import { POST } from '@/db';
import dbConnect from '@/db/dbConnect';
import { post } from '@/store/posts';
import type { NextApiRequest, NextApiResponse } from 'next'
import { SecretNetworkClient } from "secretjs";

type Data = {
    posts:post[]
};

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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await dbConnect();
    const msg={ get_post: {} }
	const posts: data = await query(msg)

	// const posts = await CARD.find();
	const metadata = await POST.find().populate('comments');

	// console.log(posts)
	// console.log("-----------------")
	// console.log(metadata)
	
	const mergedData = posts.posts.map(post => {
		// console.log(post)
		const matchedData = metadata.find(data => data.date === post.date);
		// console.log(matchedData)
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

	// console.log(mergedData)
	
    res.status(200).json({ posts:mergedData})
}