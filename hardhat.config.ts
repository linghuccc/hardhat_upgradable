import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";
dotenv.config();

// Tasks
import "./tasks/0.getsize";
import "./tasks/1.getvalue";
import "./tasks/2.init";
import "./tasks/3.set";
import "./tasks/4.remove";
import "./tasks/5.getstruct";
import "./tasks/9.checkcode";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
    },
    bscTestnet: {
      url: process.env.BNB_TEST_RPC_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BNB_SCAN_API_KEY || "",
    },
  },
};

export default config;
