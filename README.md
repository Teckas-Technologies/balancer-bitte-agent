# Balancer Assistant

## Introduction

The **Balancer Assistant** is a Node.js API designed to facilitate seamless interaction between users and the Balancer Protocol through an AI-powered interface. This API supports a wide range of DeFi functionalities, including liquidity pool management, portfolio tracking, transaction monitoring, and real-time updates.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://tinyurl.com/balancer-assistant)
[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https://github.com/Teckas-Technologies/balancer-assistant)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Manage%20Balancer%20Operations%20Easier-orange)](#)
[![Tools](https://img.shields.io/badge/Tools-web3.js%2C%20big.js-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Node.js-blue)](#)

**Author:**

[![Author](https://img.shields.io/badge/Follow-Teckas%20Technologies-blue?style=social&logo=linkedin)](https://www.linkedin.com/company/teckas/) [![Organization](https://img.shields.io/badge/Teckas%20Technologies-blue)](https://teckastechnologies.com/)

## Key Features

- **Liquidity Pool Management**: Retrieve pool balances, manage liquidity, and analyze pool performance.
- **Portfolio Tracking**: Analyze token holdings, profit/loss, and portfolio performance in real-time.
- **Transaction Monitoring**: Track Balancer pool transactions by wallet address or specific transaction hash.
- **Real-Time Updates**: Get instant updates on liquidity, swaps, and token values.

## User Flow

### 1. Swap Tokens
**Endpoint:** `GET /api/swap`
- **Summary:** Generate an EVM transaction payload for swapping tokens on Balancer.
- **Parameters:**
  - `evmAddress` (string, required): User's EVM address.
  - `amount` (string, required): Amount of USDT to transfer.
  - `inputTokenAddress` (string, required): Address of the token to swap.
  - `outputTokenAddresses` (string, required): Address of the token to receive.
- **Response:**
  - `200 OK`: Returns an EVM transaction request containing `to`, `value`, `data`, and `from` fields.
  - `400 Bad Request`: Returns an error message.
  - `500 Server Error`: Returns an error message.

### 2. Fetch Available Pools
**Endpoint:** `GET /api/pools`
- **Summary:** Retrieve available liquidity pools based on user-defined criteria.
- **Response:**
  - `200 OK`: Returns pool data.
  - `400 Bad Request`: Returns an error message.
  - `500 Server Error`: Returns an error message.

### 3. Fetch Spot Price
**Endpoint:** `GET /api/spotPrice`
- **Summary:** Calculate the spot price based on token pairs and a specific pool ID.
- **Parameters:**
  - `poolId` (string, required): Pool ID.
  - `tokenIn` (string, required): Address of the input token.
  - `tokenOut` (string, required): Address of the output token.
- **Response:**
  - `200 OK`: Returns the calculated spot price.
  - `400 Bad Request`: Returns an error message.
  - `500 Server Error`: Returns an error message.

## Conclusion

The **Balancer Assistant** provides a powerful backend solution to simplify and enhance user interactions with the Balancer Protocol. By leveraging AI-driven insights and real-time data, this solution enables users to manage liquidity pools, track portfolios, and monitor transactions with ease. Contributions and feedback from the community are welcome to enhance the functionality further.

## Step By Step

To get started with the Balancer Assistant, follow these steps:

1. **Clone repository**
```bash
git clone https://github.com/Teckas-Technologies/balancer-assistant
cd balancer-assistant
```
2. **Install dependencies**
```bash
npm install
npm run start
```

## Usage

This template utilizes the **Balancer API** to fetch real-time data from the blockchain.

## Deployment

Follow these steps to deploy the Balancer Assistant on Vercel:
- **Create an Account**: Sign up for an account on Vercel.
- **Connect GitHub**: Connect your GitHub account with Vercel.
- **Import Repository**: Import the GitHub repository of the project.
- **Add Environment Variables**: While configuring the project, add the necessary environment variables.
- **Deploy**: Click the deploy button.
- **Access Application**: Once the deployment is complete, you can access your application.