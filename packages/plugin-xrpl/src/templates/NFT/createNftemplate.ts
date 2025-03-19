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