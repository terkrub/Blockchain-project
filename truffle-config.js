require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { MNEMONIC, BSC_TESTNET_URL } = process.env;  // Add BSC_TESTNET_URL to your .env

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,  // Default Ganache CLI port
      network_id: "*",
    },
    bsctestnet: {
      provider: () => new HDWalletProvider(MNEMONIC, BSC_TESTNET_URL),
      network_id: 97,  // BSC Testnet ID
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,       // 6 million, adjust if necessary
      gasPrice: 10000000000,  // 10 Gwei, adjust if necessary

    },
  },
  
  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.1",
    }
  },
  
  // ... rest of your configuration
};
