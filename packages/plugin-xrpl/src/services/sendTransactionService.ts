import { xrpToDrops } from "xrpl";
import { xrplClient } from "./lib/xrplClient";
import { walletService } from "./lib/walletService";

/**
 * Service to send XRP from one account to another
 * @param fromAddress The address to send XRP from
 * @param toAddress The address to send XRP to
 * @param amount The amount of XRP to send
 * @returns Transaction information including the transaction ID and status
 */
export async function sendTransactionService(
		fromAddress: string,
		toAddress: string,
		amount: string
): Promise<{ txId: string; status: string }> {
		try {
				const client = await xrplClient.getClient();
				console.log("Using XRPL client");
				// elizaLogger.log("Using XRPL client");

				// Get or create a wallet instance using the wallet service
				const wallet = walletService.getWallet();

				// Verify that the wallet's address matches the sender's address
				if (wallet.address !== fromAddress) {
						throw new Error(`Unauthorized: This wallet (${wallet.address}) is not authorized to send from ${fromAddress}`);
				}

				// Prepare the payment transaction
				const prepared = await client.autofill({
						TransactionType: "Payment",
						Account: fromAddress,
						Amount: xrpToDrops(amount),
						Destination: toAddress
				});

				// Sign the transaction
				const signed = wallet.sign(prepared);

				// Submit the transaction
				const submit_result = await client.submit(signed.tx_blob);
				console.log("Transaction submitted:", JSON.stringify(submit_result, null, 2));
				// elizaLogger.log("Transaction submitted:", JSON.stringify(submit_result, null, 2));

				// Check for submission errors
				if (submit_result.result.engine_result.startsWith('tef')) {
						throw new Error(`Transaction failed: ${submit_result.result.engine_result_message}`);
				}

				// Wait for validation and get the final result
				const tx_result = await client.request({
						command: "tx",
						transaction: signed.hash
				});
				console.log("Transaction result:", JSON.stringify(tx_result, null, 2));
				// elizaLogger.log("Transaction result:", JSON.stringify(tx_result, null, 2));

				// Extract transaction ID and status
				const txId = signed.hash;
				const status = submit_result.result.engine_result;

				return {
						txId,
						status
				};

		} catch (error) {
				console.error("Transaction error:", error);
				// elizaLogger.error("Transaction error:", error);
				throw error;
		}
}