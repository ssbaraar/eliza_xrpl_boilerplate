import { CONFIG_KEYS } from "../environment";
import { xrpToDrops } from "xrpl"

export async function sendTransactionService(
  senderAddress: string,
  recipientAddress: string,
  amount: number
): Promise<{ txId: string; status: string }> {
  const url = `${CONFIG_KEYS.XRPL_API_URL}`;
  
  // Convert amount to drops
  const amountInDrops = xrpToDrops(amount.toString());
  
  const requestBody = {
    method: 'submit',
    params: [
      {
        tx_json: {
          TransactionType: 'Payment',
          Account: senderAddress,
          Destination: recipientAddress,
          Amount: amountInDrops,
          Fee: '12', // Standard fee in drops
          Sequence: 0, // This should be fetched from the network in a real implementation
          LastLedgerSequence: 0, // This should be calculated in a real implementation
        },
        secret: CONFIG_KEYS.XRPL_SECRET,
        fail_hard: true
      }
    ],
    id: 1
  };
  
  console.log("Preparing transaction request");
  
  // In a real implementation, you would first get the account_info to determine the correct Sequence number
  // and calculate the LastLedgerSequence based on the current ledger index
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json();
    console.log("Transaction response received");
    
    if (data.error || data.result?.error) {
      const errorMessage = data.error_message || data.error || data.result?.error;
      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    }

    // Extract transaction ID and status
    const txId = data.result.tx_json.hash;
    const status = data.result.engine_result;
    
    console.log(`Transaction completed with ID: ${txId} and status: ${status}`);

    return {
      txId,
      status
    };
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
}