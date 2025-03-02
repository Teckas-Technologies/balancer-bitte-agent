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
        const pools = await balancer.pools.all();
        res.json({message:"display it as table",pools});
    } catch (error) {
        console.error("Error fetching pools:", error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;