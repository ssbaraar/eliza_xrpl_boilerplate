import { elizaLogger } from "@elizaos/core";
import { xrplClient } from "./lib/xrplClient";
import { walletService } from "./lib/walletService";

/**
 * Service to create a DID on the XRP Ledger using the DIDSet transaction
 * @param options Configuration options for registering the DID
 * @returns Transaction information including the DID and transaction hash
 */
export async function createDidService(
	options: { issuerAddress: string; didDocument?: string }
): Promise<{ txId: string; status: string; did: string }> {
	try {
		const client = await xrplClient.getClient();
		elizaLogger.log("Using XRPL client for DID registration");

		// Get or create a wallet instance using the wallet service
		const wallet = walletService.getWallet();

		// Define the DID Document (optional)
		const didDocument = options.didDocument ?? JSON.stringify({ id: `did:xrpl:${options.issuerAddress}` });

		// Prepare the DIDSet transaction
		const prepared = await client.autofill({
			TransactionType: "DIDSet",
			Account: options.issuerAddress,
			DIDDocument: didDocument
		});

		// Sign the transaction
		const signed = wallet.sign(prepared);

		// Submit the transaction
		const submit_result = await client.submit(signed.tx_blob);
		elizaLogger.log("DID registration submitted:", JSON.stringify(submit_result, null, 2));

		// Generate a DID based on the issuer address
		const did = `did:xrpl:${options.issuerAddress}`;

		elizaLogger.log(`DID registered: ${did} with transaction hash: ${signed.hash}`);

		return {
			txId: signed.hash,
			status: submit_result.result.engine_result,
			did
		};
	} catch (error) {
		elizaLogger.error("DID registration error:", error);
		throw error;
	}
}

export default createDidService;
