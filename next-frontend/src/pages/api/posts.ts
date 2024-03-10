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
	  contract_address: process.env.CONTRACT_ADDRESS,
	  code_hash: process.env.CONTRACT_HASH,
	  query: query,
	});
  
	return my_query;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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

    res.status(200).json({ posts:mergedData})
}