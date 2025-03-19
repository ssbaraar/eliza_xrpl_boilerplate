import { elizaLogger } from "@elizaos/core";
import { xrplClient } from "../lib/xrplClient";
import { walletService } from "../lib/walletService";

/**
 * Service to burn an NFT on the XRP Ledger
 * @param tokenId The ID of the NFT to burn
 * @returns Transaction information including the transaction ID and status
 */
export async function burnNftService(
	tokenId: string
): Promise<{ txId: string; status: string }> {
	try {
		const client = await xrplClient.getClient();
		elizaLogger.log("Using XRPL client for NFT burn");

		// Get wallet instance
		const wallet = walletService.getWallet();

		// Prepare the NFTokenBurn transaction
		const prepared = await client.autofill({
			TransactionType: "NFTokenBurn",
			Account: wallet.address,
			NFTokenID: tokenId
		});

		// Sign the transaction
		const signed = wallet.sign(prepared);

		// Submit the transaction
		const submit_result = await client.submit(signed.tx_blob);
		elizaLogger.log("NFT burn submitted:", JSON.stringify(submit_result, null, 2));

		// Check for submission errors
		if (submit_result.result.engine_result.startsWith('tef')) {
			throw new Error(`Transaction failed: ${submit_result.result.engine_result_message}`);
		}

		return {
			txId: signed.hash,
			status: submit_result.result.engine_result
		};

	} catch (error: any) {
		elizaLogger.error("NFT burn error:", error);
		throw error;
	}
} 