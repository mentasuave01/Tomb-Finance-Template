import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const accounts = {
  mnemonic:
    process.env.MNEMONIC ||
    "test test test test test test test test test test test junk",
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    "fantom-testnet": {
      url: "https://rpc.testnet.fantom.network",
      accounts,
      chainId: 4002,
      gasMultiplier: 2,
    },
    fantom: {
      url: "https://rpc.ftm.tools",
      accounts,
      chainId: 250,
      gasPrice: 200000000000,
    },
    hardhat: {
      // eslint-disable-next-line no-undef
      accounts,
      forking: {
        url: "https://rpc.fantom.network",
        blockNumber: 37920879,
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      opera: process.env.OPERA_API_KEY,
      ftmTestnet: process.env.FTM_TESTNET_API_KEY,
    },
  },
};

export default config;
