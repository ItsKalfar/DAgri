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
  } catch (e) {
    log(`${e.message}`);
  }
};
