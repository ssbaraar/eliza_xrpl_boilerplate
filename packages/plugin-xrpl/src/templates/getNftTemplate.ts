export const formatNftDetailsTemplate = `
Context:
- NFT ID: {{nftId}}
- URI: {{uri}}
- Owner: {{owner}}
- Transfer Fee: {{transferFee}}
- Serial Number: {{serialNumber}}
- Burnable Status: {{burnableStatus}}
- Transferable Status: {{transferableStatus}}


Don't add additional information, stay factual.

Your response should look like this:

🖼️ NFT Details:
• ID: {{nftId}}
• Metadata URI: {{uri}}
• Owner: {{owner}}
• Transfer Fee: {{transferFee}}%
• Serial #{{serialNumber}}
• Properties: {{burnableStatus}}, {{transferableStatus}}
`; 