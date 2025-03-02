const express = require('express');
const { BalancerSDK, Network, parseFixed, SwapType } = require("@balancer-labs/sdk");
const router = express.Router();
const { parseEther } = require('viem');
const { toBigInt,ethers } = require('ethers');
const { signRequestFor } = require('@bitte-ai/agent-sdk');
const balancer = new BalancerSDK({
    network: Network.POLYGON,
    rpcUrl: 'https://rpc.ankr.com/polygon'
  });
const PRIVATE_KEY = "df387fd2c40e32d5f13337d86c754977aedd66be1c8effa1196092fbfc17a427";
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/polygon");
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const { swaps } = balancer;
router.get("/", async (req, res) => {
  try {
    const { amount, evmAddress,inputTokenAddress,outputTokenAddreses } = req.query;
    console.log(evmAddress);
    console.log(inputTokenAddress);
    if (!amount || !evmAddress ) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
     await swaps.fetchPools();
    const pools = swaps.getPools();
    const supportedPools = pools.filter(pool =>
      pool.tokens.some(t => t.address.toLowerCase() === inputTokenAddress.toLowerCase()) &&
      pool.tokens.some(t => t.address.toLowerCase() === outputTokenAddreses.toLowerCase())
    );
    if (supportedPools.length === 0) {
      return res.status(400).json({ error: "No supported pools available for this token transfer" });
    }
    const swapInfo = await swaps.findRouteGivenIn({
      tokenIn: inputTokenAddress,
      tokenOut: outputTokenAddreses,
      amount: parseEther(amount),
      gasPrice: parseFixed("1",9),
      maxPools: 1,
    });
    console.log(swapInfo);
    if (!swapInfo || swapInfo.swaps.length === 0) {
      return res.status(400).json({ error: "No swap route found" });
    }
    const maxSlippage = "2000";
    const deadline = (Math.floor(Date.now() / 1000) + 60 * 10).toString();
    const swapTransaction = await swaps.buildSwap({
      userAddress:evmAddress,
      swapInfo,
      kind: SwapType.SwapExactIn,
      deadline,
      maxSlippage,
    });
    console.log(swapTransaction);
    const { to, data } = swapTransaction;
    const tx = {
      to,
      data,
      value: parseEther(amount)
    };

    const signRequestTransaction = signRequestFor({
      chainId: Network.POLYGON,
      metaTransactions: [{to,data,value: "0x" + parseEther(amount).toString(16)}]
    });
    res.json({
      message: `Before initiating this transaction, ask the AI to check if the allowance for ${"0x" + parseEther(amount).toString(16)} to ${to} is sufficient. If not, approve it first and then proceed with the swap transaction.`,
      evmSignRequest:signRequestTransaction
    });
  } catch (error) {
    console.error("Error in swap route:", error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;