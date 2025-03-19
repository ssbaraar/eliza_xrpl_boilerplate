import { ActionExample } from "@elizaos/core";

export const getNftExamples: ActionExample[][] = [
	[
		{
			user: "{{user1}}",
			content: { text: "Show me the details of NFT {nftId}" }
		},
		{
			user: "{{agent}}",
			content: { 
				text: "I'll fetch the information for this NFT! 🔍",
				action: "GET_NFT"
			}
		}
	],
	[
		{
			user: "{{user1}}",
			content: { text: "What are the details of NFT {nftId}?" }
		},
		{
			user: "{{agent}}",
			content: { 
				text: "I'll look up that NFT information for you! 🎨",
				action: "GET_NFT"
			}
		}
	],
	[
		{
			user: "{{user1}}",
			content: { text: "Check the URI of NFT {nftId}" }
		},
		{
			user: "{{agent}}",
			content: { 
				text: "I'll verify the URI and other details of this NFT! 📋",
				action: "GET_NFT"
			}
		}
	]
]; 