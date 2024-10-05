'use client';

import { Profile } from '@/app/profile/page';
import { contractABI } from '@/lib/constants';
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

	return (
		<div>
			ProfilePage {params.address}
			<div>{JSON.stringify(profileData)}</div>
			<div>{JSON.stringify(fetchProfileError)}</div>
			<div>{isFetchingProfile.toString()}</div>
		</div>
	);
}
