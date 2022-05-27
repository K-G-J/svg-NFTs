require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-deploy')
require('dotenv').config()
const fs = require('fs');

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const PRIVATE_KEY = fs.readFileSync(".secret").toString().trim()

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      saveDeployments: true
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  solidity: {
    compilers: [
      {
        version: '0.8.4',
      },
      {
        version: '0.7.0',
      },
      {
        version: '0.6.6',
      },
      {
        version: '0.4.24',
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
}
