import { http, createConfig } from 'wagmi';
import { defineChain, type Chain } from 'viem';
import { network } from './constants';
import { isTestnet } from './utils';

const mainnet = defineChain({
	id: network.mainnet.chainId,
	name: network.mainnet.name,
	nativeCurrency: {
		name: network.mainnet.currencySymbol,
		symbol: network.mainnet.currencySymbol,
		decimals: 8,
	},
	rpcUrls: {
		default: {
			http: [network.mainnet.rpcEndpoint],
			webSocket: [network.mainnet.wssEndpoint],
		},
	},
	blockExplorers: {
		default: {
			name: 'Neo X Chain explorer',
			url: network.mainnet.blockExplorer,
		},
	},
} as const satisfies Chain);

const testnet = defineChain({
	id: network.testnet.chainId,
	name: network.testnet.name,
	nativeCurrency: {
		name: network.testnet.currencySymbol,
		symbol: network.testnet.currencySymbol,
		decimals: 8,
	},
	rpcUrls: {
		default: {
			http: [network.testnet.rpcEndpoint],
			webSocket: [network.testnet.wssEndpoint],
		},
	},
	blockExplorers: {
		default: {
			name: 'Neo X Chain explorer',
			url: network.testnet.blockExplorer,
		},
	},
} as const satisfies Chain);

declare module 'wagmi' {
	interface Register {
		config: typeof config;
	}
}

export const config = createConfig({
	chains: isTestnet() ? [testnet] : [mainnet],
	transports: isTestnet()
		? { [testnet.id]: http() }
		: { [mainnet.id]: http() },
	ssr: true,
});
