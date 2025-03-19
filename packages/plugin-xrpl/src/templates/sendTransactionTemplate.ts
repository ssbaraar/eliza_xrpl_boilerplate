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