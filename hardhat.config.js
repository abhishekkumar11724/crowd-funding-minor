require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
const ACCOUNT_PRIVATE_KEY = "4c9dedc7ff51678e7dc4798b97a9e9039c3bfb6c02b5b6e0eb65648bcf8d74b9";
const ALCHEMY_KEY = "9CoodifaspeMuch2RepgIqrclyXhAk73";

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "sepolia",
  paths: {
    artifacts: "./client/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 31337,
      // allowUnlimitedContractSize: true
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    }
  },
};