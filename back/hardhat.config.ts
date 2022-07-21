
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.15",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {

    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/d9153f9f351946c1841e246d19825eb6",
      accounts: []
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths: {
    sources: './tokens/contracts',
    tests: './tokens/test',
    artifacts: './tokens/artifacts',
    cache: './tokens/cache',
    root: './tokens'
  }
};

export default config;
