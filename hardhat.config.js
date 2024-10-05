require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.27',
	networks: {
		mainnet: {
			url: 'https://mainnet-1.rpc.banelabs.org',
			chainId: 47763,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
		testnet: {
			url: 'https://neoxt4seed1.ngd.network',
			chainId: 12227332,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
	},
};
