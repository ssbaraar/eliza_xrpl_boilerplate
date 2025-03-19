# XRPL Plugin for Eliza


## Configuration

- `XRPL_SECRET`: XRPL Wallet Private Key
- `XRPL_API_URL`: XRPL Node URL (Testnet or Mainnet)


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
    Additional options:
  - Count
  - Date (Start and End)
  - NftId



### Account Information
- Get Account Balance
  ```
  What's the balance of rNczJQ1ZnJb8KyaTpdcTPfjgWKor8P8MN3
  ```

- Get Transaction History
  ```
  Show me the last transactions 
  ```
  Additional options:
  - Count 
  - Date (Start and End)
  - Addr




