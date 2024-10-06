import { Button } from '@/components/ui/button';
import { LinkIcon, UserPenIcon, WalletIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="-mx-5 -mt-5">
			{/* ----- HERO ----- */}
			<section className="bg-gradient-to-r from-rose-700 to-rose-400 text-white p-20">
				<div className="px-5">
					<h1 className="text-4xl font-black">
						Create Your Decentralized Profile on NeoCard
					</h1>
					<p className="text-lg mt-3">
						Your Web3 identity, stored securely on the blockchain,
						shareable anywhere.
					</p>
					<Link
						href="https://github.com/almoloo/neocard"
						passHref
					>
						<Button
							variant="secondary"
							size="lg"
							className="mt-5"
						>
							Learn More
						</Button>
					</Link>
				</div>
			</section>
			{/* ----- HOW IT WORKS ----- */}
			<section className="bg-slate-50 text-neutral-800 p-20">
				<div className="px-5">
					<h2 className="text-3xl font-black text-center mb-10">
						How It Works
					</h2>
					<div className="flex flex-col lg:grid lg:grid-cols-3 gap-5">
						{/* CONNECT YOUR WALLET */}
						<div className="flex flex-col items-center">
							<WalletIcon className="w-16 h-16 text-neutral-500" />
							<h3 className="text-lg font-black mt-5 mb-2">
								Connect Your Wallet
							</h3>
							<p className="text-neutral-500 text-sm text-center leading-relaxed">
								You can connect your wallet to NeoCard using
								multiple providers like MetaMask, and more.
							</p>
						</div>
						{/* CREATE YOUR PROFILE */}
						<div className="flex flex-col items-center mt-10 lg:mt-0">
							<UserPenIcon className="w-16 h-16 text-neutral-500" />
							<h3 className="text-lg font-black mt-5 mb-2">
								Create Your Profile
							</h3>
							<p className="text-neutral-500 text-sm text-center leading-relaxed">
								Once connected, you can create your profile with
								your personal details.
							</p>
						</div>
						{/* SHARE YOUR UNIQUE LINK */}
						<div className="flex flex-col items-center mt-10 lg:mt-0">
							<LinkIcon className="w-16 h-16 text-neutral-500" />
							<h3 className="text-lg font-black mt-5 mb-2">
								Share Your Unique Link
							</h3>
							<p className="text-neutral-500 text-sm text-center leading-relaxed">
								Share your unique link with anyone to show your
								profile to the world.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
