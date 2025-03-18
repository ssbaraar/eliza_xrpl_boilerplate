export const formatBalanceTemplate = `
Context:
- Wallet address: {{address}}
- Balance: {{balance}} {{currency}}

Don't add additional information, stay factual.

Change the phrasing of this example to make it more natural and random.

Your response should look like this:
This wallet has {{balance}} {{currency}}.

or

According to what I found on the explorer, {{address}} has {{balance}} {{currency}}.
`;

export const formatTransactionTemplate = `
Context:
- Sender address: {{senderAddress}}
- Recipient address: {{recipientAddress}}
- Amount: {{amount}} {{currency}}
- Transaction ID: {{transactionId}}
- Transaction status: {{transactionStatus}}

Don't add extra information, stay factual.

Change the phrasing of this example to make it more natural and random.

Your response should look like this:
I've sent {{amount}} {{currency}} from your wallet to {{recipientAddress}}. Transaction complete!

or

The transaction of {{amount}} {{currency}} to {{recipientAddress}} has been processed successfully.

or

Done! {{amount}} {{currency}} transferred from {{senderAddress}} to {{recipientAddress}}. Transaction ID: {{transactionId}}
`;

export const formatNftCreationTemplate = `
Context:
- Issuer address: {{issuerAddress}}
- Token URI: {{tokenURI}}
- Token ID: {{tokenId}}
- Transaction ID: {{transactionId}}
- Transaction status: {{transactionStatus}}
- Transfer fee: {{transferFee}}%
- Is burnable: {{isBurnable}}
- Is transferable: {{isTransferable}}

Don't add extra information, stay factual.

Change the phrasing of this example to make it more natural and random.

Your response should look like this:
NFT created successfully! Token ID: {{tokenId}}

or

Your NFT has been minted on the XRP Ledger. Token ID: {{tokenId}}

or

I've created an NFT with the URI {{tokenURI}} for you. It's now available on the XRP Ledger with Token ID: {{tokenId}}
`;