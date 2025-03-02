const express = require("express");
const { BalancerSDK ,Network} = require("@balancer-labs/sdk");
const { ethers, parseEther } = require("ethers");

const router = express.Router();

const sdkConfig = {
   network: Network.POLYGON,
   rpcUrl: 'https://rpc.ankr.com/polygon'
};
const balancer = new BalancerSDK(sdkConfig);

router.get("/join-pool", async (req, res) => {
    try {
      const { poolId, joiner, tokensIn, amountsIn, slippage } = req.query;
  
      if (!poolId || !joiner || !tokensIn || !amountsIn || !slippage) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
  
      const pool = await balancer.pools.find(poolId);
      if (!pool) return res.status(404).json({ error: "Pool not found" });
  
      const tokensArray = tokensIn.split(",");
      const amountsArray = amountsIn.split(",");
  
      if (tokensArray.length !== amountsArray.length) {
        return res.status(400).json({ error: "tokensIn and amountsIn length mismatch" });
      }
  
      const { to, data } = pool.buildJoin({
        joiner,
        tokensIn: tokensArray,
        amountsIn: amountsArray,
        slippage,
      });
  
      res.json({ success: true, to, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to join pool" });
    }
  });


router.get("/exit-pool/bpt-in", async (req, res) => {
  try {
    const { poolId, exiter, bptIn, slippage, singleTokenMaxOut } = req.query;

    const pool = await balancer.pools.find(poolId);
    if (!pool) return res.status(404).json({ error: "Pool not found" });

    const { to, data } = pool.buildExitExactBPTIn({
      exiter,
      bptIn,
      slippage,
      singleTokenMaxOut,
    });

    const tx = await signer.sendTransaction({ to, data });
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to exit pool (BPT In)" });
  }
});

router.get("/exit-pool/tokens-out", async (req, res) => {
  try {
    const { poolId, exiter, tokensOut, amountsOut, slippage } = req.query;

    const pool = await balancer.pools.find(poolId);
    if (!pool) return res.status(404).json({ error: "Pool not found" });

    const { to, data } = pool.buildExitExactTokensOut({
      exiter,
      tokensOut,
      amountsOut,
      slippage,
    });

    const tx = await signer.sendTransaction({ to, data });
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to exit pool (Tokens Out)" });
  }
});

module.exports = router;
