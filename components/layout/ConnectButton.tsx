'use client';

import { useAccount, useConnect, type Connector } from 'wagmi';
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
import { LogOutIcon, WalletIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ConnectButton() {
	const { isConnected, isConnecting, isReconnecting, connector } =
		useAccount();
	const { connectors, connectAsync } = useConnect();
	const router = useRouter();

	// ----- HANDLE CONNECT
	const handleConnect = async (connector: Connector) => {
		try {
			await connectAsync({
				connector,
				chainId: isTestnet()
					? network.testnet.chainId
					: network.mainnet.chainId,
			});
			router.push('/profile');
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
			router.push('/');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div>
				{isConnected ? (
					<nav className="flex">
						<Link
							href="/profile"
							passHref
						>
							<Button variant="link">Edit Profile</Button>
						</Link>
						<Button
							onClick={() => handleDisconnect()}
							variant="secondary"
						>
							<LogOutIcon className="w-4 h-4 mr-2" />
							Sign out
						</Button>
					</nav>
				) : (
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<WalletIcon className="w-4 h-4 mr-2" />
								Sign in
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Connect to a wallet</DialogTitle>
								<DialogDescription>
									Select a wallet provider to connect to.
								</DialogDescription>
							</DialogHeader>
							<div className="flex flex-col gap-1">
								{connectors.length === 0 ? (
									<small className="rounded border bg-slate-50 p-4 text-center text-neutral-500">
										No connectors available
									</small>
								) : (
									<>
										{connectors.map((connector) => (
											<Button
												key={connector.id}
												onClick={() =>
													handleConnect(connector)
												}
												variant="outline"
												size="lg"
												disabled={
													isConnecting ||
													isReconnecting
												}
											>
												{connector.icon && (
													<img
														src={connector.icon}
														alt={connector.name}
														className="mr-2 h-4 w-4"
													/>
												)}
												{connector.name}
											</Button>
										))}
									</>
								)}
							</div>
						</DialogContent>
					</Dialog>
				)}
			</div>
		</>
	);
}
