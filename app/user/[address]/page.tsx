'use client';

import { Profile } from '@/app/profile/page';
import { badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import LinkItem from '@/components/user/LinkItem';
import { contractABI } from '@/lib/constants';
import { addressEllipsis, convertIPFSHashToURL } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAccount, useReadContract } from 'wagmi';

interface ProfilePageProps {
	params: {
		address: string;
	};
}

export default function UserPage({ params }: ProfilePageProps) {
	const { address } = useAccount();
	const abi = contractABI;

	const {
		data: profileData,
		error: fetchProfileError,
		isPending: isFetchingProfile,
		isFetched: isProfileFetched,
	} = useReadContract({
		abi,
		address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
		functionName: 'getProfile',
		args: [address],
	}) as {
		data: Profile;
		error: Error;
		isPending: boolean;
		isFetched: boolean;
	};

	useEffect(() => {
		if (!isProfileFetched) return;
		if (profileData[4] === false) {
			notFound();
		}
	}, [isProfileFetched, profileData]);

	function handleCopyAddress() {
		navigator.clipboard.writeText(address as string).then(() => {
			toast('Address copied to clipboard!');
		});
	}

	return (
		<div className="flex flex-col items-center gap-5">
			{isFetchingProfile ? (
				<>
					<Skeleton className="w-[100px] h-[100px] rounded-full" />
					<section className="flex flex-col items-center gap-3">
						<Skeleton className="w-[150px] h-7" />
						<Skeleton className="w-[300px] h-6" />
						<Skeleton className="w-[150px] h-7" />
					</section>
				</>
			) : (
				<>
					{/* ----- AVATAR ----- */}
					<Image
						src={convertIPFSHashToURL(profileData[2])}
						alt="Avatar"
						width={100}
						height={100}
						className="rounded-full"
						priority
					/>
					{/* ----- INFO ----- */}
					<section className="flex flex-col items-center gap-3">
						<h1 className="text-xl font-black">{profileData[0]}</h1>
						<p className="text-neutral-700">{profileData[1]}</p>
						<Button
							size="sm"
							title="Copy Address"
							onClick={handleCopyAddress}
							className={badgeVariants({ variant: 'secondary' })}
						>
							{addressEllipsis(address as string, 6)}
							<CopyIcon className="w-4 h-4 ml-1" />
						</Button>
					</section>
					{/* ----- LINKS ----- */}
					{profileData[3].length > 0 && (
						<section className="flex flex-col border rounded-lg max-w-full w-[400px]">
							<div className="bg-slate-100 text-center text-sm px-2 py-4">
								Follow me around the web
							</div>
							{profileData[3].map((link, index) => (
								<LinkItem
									link={link}
									index={index}
								/>
							))}
						</section>
					)}
					{/* <div>
						ProfilePage {params.address}
						<div>{JSON.stringify(profileData)}</div>
						<div>{JSON.stringify(fetchProfileError)}</div>
						<div>{isFetchingProfile.toString()}</div>
					</div> */}
				</>
			)}
		</div>
	);
}
