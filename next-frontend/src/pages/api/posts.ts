import { POST } from '@/db';
import dbConnect from '@/db/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next'
import { SecretNetworkClient } from "secretjs";

const query = async (query) => {
    
    let secretjs = new SecretNetworkClient({
		chainId: "pulsar-3",
		url: "https://api.pulsar.scrttestnet.com",
	});

	const my_query = await secretjs.query.compute.queryContract({
	  contract_address: process.env.contractAddress,
	  code_hash: process.env.contractCodeHash,
	  query: query,
	});
  
	return my_query;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();
    const msg={ get_post: {} }
	const posts = await query(msg)
	// const metadata = await POST.find();
	// console.log("this is me"+metadata)
	
	// const mergedData = posts.map(post => {
	// 	const matchedData = metadata.find(data => data.id === post.id);
	// 	return { ...post, ...matchedData };
	// });
	
    res.status(200).json(posts)
}