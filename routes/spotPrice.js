const express = require("express");
const { BalancerSDK ,Network} = require("@balancer-labs/sdk");
const { ethers, parseEther } = require("ethers");

const router = express.Router();

const sdkConfig = {
   network: Network.POLYGON,
   rpcUrl: 'https://rpc.ankr.com/polygon'
};
const balancer = new BalancerSDK(sdkConfig);

router.get("/", async (req, res) => {
  try {
    const { poolId, tokenIn,  tokenOut } = req.query;

    const pool = await balancer.pools.find(poolId);
    if (!pool) return res.status(404).json({ error: "Pool not found" });
  
    const spotPrice = await pool.calcSpotPrice(tokenIn, tokenOut);

    res.json({
        poolId,
        tokenIn,
        tokenOut,
        spotPrice: spotPrice.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to join pool" });
  }
});


module.exports = router;