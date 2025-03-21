# ElizaOS XRPL Plugin Boilerplate

The XRPL Plugin for ElizaOS enables seamless integration with the XRP Ledger, providing a unified interface for transactions, NFT operations, and account information. This plugin now includes DID (Decentralized Identifier) support, making it easier to integrate secure identity features into your blockchain applications.

## Features

### Transactions
- **Send XRP Between Accounts**  
  You can send XRP by specifying the recipient, or explicitly indicate the sender and recipient.  
  **Examples:**  
  ```bash
  Send 10 XRP to rUCzEr6jrEyMpjXRyhtKijXeNFqEJMbC8X
  ```  
  ```bash
  Send 10 XRP from rNczJQ1ZnJb8KyaTpdcTPfjgWKor8P8MN3 to rUCzEr6jrEyMpjXRyhtKijXeNFqEJMbC8X
  ```

### NFT Operations
- **Create NFT**  
  Create an NFT with a designated URI. You can also specify optional parameters such as transfer fee, burnable, and transferable flags.  
  **Example:**  
  ```bash
  Create an NFT on rNczJQ1ZnJb8KyaTpdcTPfjgWKor8P8MN3 with URI https://example.com/metadata.json with 2% transfer fee not burnable not transferable
  ```
- **Get NFT Details**  
  Retrieve detailed information about a specific NFT.  
  **Example:**  
  ```bash
  Show me the details of NFT 0000000095680690F8F2D01B202320A2C60425B757588880DFE0A1700057B2D5
  ```
  **Returns:**  
  - Token ID  
  - URI  
  - Owner  
  - Transfer Fee  
  - Serial Number  
  - Flags  
  - Taxon  

### Account Information
- **Get Account Balance**  
  Check the balance of a specified XRPL account.  
  **Example:**  
  ```bash
  What's the balance of rNczJQ1ZnJb8KyaTpdcTPfjgWKor8P8MN3
  ```
- **Get Transaction History**  
  Retrieve the latest transactions for a given account.  
  **Example:**  
  ```bash
  Show me the last 5 transactions for rNczJQ1ZnJb8KyaTpdcTPfjgWKor8P8MN3
  ```

## Plugin Enhancements and File Updates

- **Boilerplate Setup**  
  The plugin now integrates into ElizaOS with a ready-to-use boilerplate structure.

- **New File: `createDiD.ts`**  
  - **Purpose:** Adds DID support for enhanced identity management within the plugin.
  - **Changes:** Implements the necessary interfaces and logic to register and manage DIDs.

- **Updated Files:**
  - **`createNFT.ts`**  
    - **Enhancements:** Added DID support and performed code clean-up for proper indentation and TypeScript interface usage.
  - **`getBalance.ts`**  
    - **Enhancements:** Improved getter functions and refined transaction service interactions.
  - **`getNft.ts`**  
    - **Enhancements:** Integrated DID support and applied minor tweaks for improved functionality.
  - **`getTransaction.ts`**  
    - **Enhancements:** Added DID support along with other minor fixes.
  - **`sendTransaction.ts`**  
    - **Enhancements:** General improvements and tweaks for better performance and reliability.

## Configuration

To use the XRPL Plugin with ElizaOS, configure the following environment variables:

- **`XRPL_SECRET`**: Your XRPL wallet private key.
- **`XRPL_API_URL`**: The URL of the XRPL node (Testnet or Mainnet).

## Getting Started

1. **Clone the Repository**  
   Clone the ElizaOS boilerplate with the XRPL Plugin included.

2. **Install Dependencies**  
   Ensure you have Node.js installed and run:
   ```bash
   pnpm i
   pnpm build
   cp .env.example .env
   ```

3. **Configure Environment Variables**  
   Modify the `.env` file at the project root with:
   ```env
   XRPL_SECRET=your_xrpl_private_key
   XRPL_API_URL=wss://your.xrpl.node.url
   ```

4. **Run the Application**  
   Start the ElizaOS application with the integrated XRPL Plugin:
   ```bash
   pnpm start --characters="/characters/xrpl.character.json"
   ```

5. **Use the Commands**  
   You can now execute commands as described in the Features section to interact with XRPL.

## Contributing

Contributions and improvements are welcome. Please follow standard GitHub workflows when submitting pull requests or issues.

## License

[MIT License](LICENSE)
