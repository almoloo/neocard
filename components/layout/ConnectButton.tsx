'use client';

import { useAccount, useConnect, useSwitchChain, type Connector } from 'wagmi';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { isTestnet } from '@/lib/utils';
import { network } from '@/lib/constants';

export default function ConnectButton() {
	const {
		isConnected,
		isDisconnected,
		isConnecting,
		isReconnecting,
		connector,
	} = useAccount();
	const { connectors, connectAsync } = useConnect();
	const { chains, switchChainAsync } = useSwitchChain();
	const { address } = useAccount();

	// ----- HANDLE CONNECT
	const handleConnect = async (connector: Connector) => {
		try {
			await connectAsync({
				connector,
				chainId: isTestnet()
					? network.testnet.chainId
					: network.mainnet.chainId,
			});
		} catch (error) {
			console.error(error);
		}
	};

	// ----- HANDLE DISCONNECT BUTTON
	const handleDisconnect = async () => {
		if (!connector) {
			console.error('No connector provided');
			return;
		}
		try {
			await connector.disconnect();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div>
				{isConnected ? (
					<Button onClick={() => handleDisconnect()}>
						Disconnect
					</Button>
				) : (
					<Dialog>
						<DialogTrigger asChild>
							<Button>Connect</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Connect to a wallet</DialogTitle>
								<DialogDescription>
									Select a wallet provider to connect to.
								</DialogDescription>
							</DialogHeader>
							<div>
								{connectors.map((connector) => (
									<Button
										key={connector.id}
										onClick={() => handleConnect(connector)}
									>
										{connector.name}
									</Button>
								))}
							</div>
						</DialogContent>
					</Dialog>
				)}
			</div>
		</>
	);
}
