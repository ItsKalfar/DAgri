const {
  networkConfig,
  developmentChains,
} = require("../hardhat-helper-config");
const { ethers, run, network } = require("hardhat");
const { verify } = require("../utils/Verify");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  args = [];
  try {
    log("-------------------------------------------------------");
    log("1) Deploying Contract");
    const supplyChain = await deploy("SupplyChain", {
      from: deployer,
      args: args,
      log: true,
      waitConfirmtions: network.config.blockConfirmations || 1,
    });
    log("-------------------------------------------------------");
    log(`1) Contract Deplyed at ${supplyChain.address}`);
    log("-------------------------------------------------------");
    if (
      !developmentChains.includes(network.name) &&
      process.env.ETHERSCAN_API_KEY
    ) {
      log("Verifying....");
      await verify(supplyChain.address, args);
      log("Verified....");
    }
  } catch (error) {
    log(` Failed because---${error}`);
  }
};

module.exports.tags = ["all", "supplyChain"];
