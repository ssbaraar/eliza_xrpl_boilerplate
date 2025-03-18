import { CONFIG_KEYS } from "../environment";

/**
 * Service to create an NFT on the XRP Ledger
 * @param issuerAddress The address that will issue the NFT
 * @param tokenURI The URI pointing to the NFT metadata
 * @param transferFee Optional transfer fee percentage (0-50000 representing 0%-50%)
 * @param isBurnable Whether the NFT can be burned
 * @param isTransferable Whether the NFT can be transferred
 * @returns Transaction information including the token ID and transaction hash
 */
export async function createNftService(
    issuerAddress: string,
    tokenURI: string,
    transferFee: number = 0,
    isBurnable: boolean = true,
    isTransferable: boolean = true
    ): Promise<{ txId: string; status: string; tokenId: string }> {
    const url = `${CONFIG_KEYS.XRPL_API_URL}`;
    
    // Convert transfer fee to proper format (e.g., 10% = 10000)
    const formattedTransferFee = Math.min(Math.max(Math.floor(transferFee * 1000), 0), 50000);
    
    // Calculate flags for the NFT
    let flags = 0;
    if (!isBurnable) flags |= 1;      // lsfBurnable - default is burnable
    if (!isTransferable) flags |= 8;  // lsfTransferable - default is transferable
    
    // Prepare the NFToken minting transaction
    const requestBody = {
        method: 'submit',
        params: [
        {
            tx_json: {
            TransactionType: 'NFTokenMint',
            Account: issuerAddress,
            URI: Buffer.from(tokenURI).toString('hex').toUpperCase(), // Convert URI to hex
            Flags: flags,
            TransferFee: formattedTransferFee,
            NFTokenTaxon: 0, // Required field, can be any value
            Fee: '12', // Standard fee in drops
            Sequence: 0, // This should be fetched from the network in a real implementation
            LastLedgerSequence: 0, // This should be calculated in a real implementation
            },
            secret: CONFIG_KEYS.XRPL_SECRET ?? '', // Should be securely managed
            fail_hard: true
        }
        ],
        id: 1
    };
    
    console.log("Preparing NFT minting transaction");
    
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
        console.log("NFT minting response received");
        
        if (data.error || data.result?.error) {
        const errorMessage = data.error_message || data.error || data.result?.error;
        console.error("API Error:", errorMessage);
        throw new Error(errorMessage);
        }

        // Extract transaction ID and status
        const txId = data.result.tx_json.hash;
        const status = data.result.engine_result;
        
        // In a real implementation, we would need to query the ledger after the transaction is validated
        // to get the actual NFTokenID. For this example, we'll generate a placeholder.
        const tokenId = `${txId.substring(0, 16)}...`;
        
        console.log(`NFT minted with ID: ${tokenId} and transaction hash: ${txId}`);

        return {
        txId,
        status,
        tokenId
        };
    } catch (error) {
        console.error("NFT minting error:", error);
        throw error;
    }
}