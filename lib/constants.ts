export const network = {
	mainnet: {
		name: 'NeoX Mainnet',
		chainId: 47763,
		rpcEndpoint: 'https://mainnet-1.rpc.banelabs.org',
		wssEndpoint: 'wss://mainnet.wss1.banelabs.org/',
		blockExplorer: 'https://xexplorer.neo.org',
		currencySymbol: 'GAS',
	},
	testnet: {
		name: 'NeoX T4',
		chainId: 12227332,
		rpcEndpoint: 'https://neoxt4seed1.ngd.network',
		wssEndpoint: 'wss://neoxt4wss1.ngd.network',
		blockExplorer: 'https://xt4scan.ngd.network/',
		currencySymbol: 'GAS',
	},
};

export const contractABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'user',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'string',
				name: 'username',
				type: 'string',
			},
			{
				indexed: false,
				internalType: 'string',
				name: 'bio',
				type: 'string',
			},
			{
				indexed: false,
				internalType: 'string',
				name: 'avatarHash',
				type: 'string',
			},
			{
				indexed: false,
				internalType: 'string[]',
				name: 'socialLinks',
				type: 'string[]',
			},
		],
		name: 'ProfileUpserted',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'getProfile',
		outputs: [
			{
				internalType: 'string',
				name: 'username',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'bio',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'avatarHash',
				type: 'string',
			},
			{
				internalType: 'string[]',
				name: 'socialLinks',
				type: 'string[]',
			},
			{
				internalType: 'bool',
				name: 'exists',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_username',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_bio',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_avatarHash',
				type: 'string',
			},
			{
				internalType: 'string[]',
				name: '_socialLinks',
				type: 'string[]',
			},
		],
		name: 'upsertProfile',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];
