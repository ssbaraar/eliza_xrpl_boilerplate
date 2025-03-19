# XRPL Plugin for Eliza

## Features

### Transactions
- Send XRP between accounts
  ```
  Send 10 XRP to rUCzEr6jrEyMpjXRyhtKijXeNFqEJMbC8X
  ```
  or
  ```
  Send 10 XRP from rNczJQ1ZnJb8KyaTpdcTPfjgWKor8P8MN3 to rUCzEr6jrEyMpjXRyhtKijXeNFqEJMbC8X
  ```

### NFT Operations
- Create NFT
  ```
  Create an NFT on rNczJQ1ZnJb8KyaTpdcTPfjgWKor8P8MN3 with URI https://example.com/metadata.json
  ```
  Additional options:
  - Transfer fee: `with 2% transfer fee`
  - Burnable flag: `not burnable`
  - Transferable flag: `not transferable`

- Get NFT Details
  ```
  Show me the details of NFT 0000000095680690F8F2D01B202320A2C60425B757588880DFE0A1700057B2D5
  ```
  Returns:
  - Token ID
  - URI
  - Owner
  - Transfer Fee
  - Serial Number
  - Flags
  - Taxon

### Account Information
- Get Account Balance
  ```
  What's the balance of rNczJQ1ZnJb8KyaTpdcTPfjgWKor8P8MN3
  ```

- Get Transaction History
  ```
  Show me the last 5 transactions for rNczJQ1ZnJb8KyaTpdcTPfjgWKor8P8MN3
  ```



## Configuration

- `XRPL_SECRET`:
- `XRPL_API_URL`: 
