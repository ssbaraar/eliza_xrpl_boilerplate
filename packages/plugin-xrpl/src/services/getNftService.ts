import { elizaLogger } from "@elizaos/core";
import { xrplClient } from "./lib/xrplClient";
import { walletService } from "./lib/walletService";

// Define the NFTDetails type
interface NFTDetails {
	tokenId: string;
	uri: string;
	owner: string;
	flags: number;
	transferFee: number;
	serialNumber: number;
	taxon: number;
}


/**
 * Service to get NFT details from the XRP Ledger
 * @param tokenId The NFT token ID to query
 * @returns NFT details including URI and other metadata
 */
export async function getNftService(tokenId: string): Promise<NFTDetails> {
	const client = await xrplClient.getClient();
	elizaLogger.log("Using XRPL client to fetch NFT details");

	let owner = "";

	// First try to find the NFT in sell offers
	try {
		const nftSellOffers = await client.request({
			command: "nft_sell_offers",
			nft_id: tokenId
		});

		// Get the owner from the NFT sell offers response
		owner = nftSellOffers.result.offers?.[0]?.owner || "";
		if (owner) {
			elizaLogger.log("Found NFT in sell offers from:", owner);
		}
	} catch (error: any) {
		elizaLogger.log("Could not fetch sell offers, will check wallet instead:", error.message);
	}

	// If no owner found in sell offers, check our wallet
	if (!owner) {
		try {
			elizaLogger.log("Checking our wallet for NFT");
			
			// Get our wallet address
			const wallet = walletService.getWallet();
			elizaLogger.log(`Checking wallet ${wallet.address} for NFT`);
			
			const accountNfts = await client.request({
				command: "account_nfts",
				account: wallet.address
			});

			const nft = accountNfts.result.account_nfts.find(
				(nft: any) => nft.NFTokenID === tokenId
			);

			if (nft) {
				elizaLogger.log("Found NFT in our wallet");
				// Convert hex URI to string if it exists
				const hexUri = nft.URI || "";
				const decodedUri = hexUri ? Buffer.from(hexUri, 'hex').toString('utf-8') : '';

				// Extract transfer fee from flags if available
				const transferFee = (nft.Flags & 0x000FF000) >> 12;

				return {
					tokenId: nft.NFTokenID,
					uri: decodedUri,
					owner: wallet.address,
					flags: nft.Flags,
					transferFee: transferFee,
					serialNumber: parseInt(tokenId.slice(-8), 16), // Extract serial from tokenId
					taxon: nft.NFTokenTaxon
				};
			}
		} catch (error: any) {
			elizaLogger.error("Error checking wallet for NFT:", error.message);
			throw new Error("Failed to check wallet for NFT: " + error.message);
		}
	}

	throw new Error("NFT not found in sell offers or our wallet");
} 