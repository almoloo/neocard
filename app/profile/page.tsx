'use client';
import { contractABI } from '@/lib/constants';
import { isTestnet } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export type Profile = [string, string, string, string[], boolean];

const formSchema = z.object({
	username: z.string().min(2).max(30),
	bio: z.string().max(160),
	socialLinks: z.array(z.string().url()),
	avatar: z.instanceof(FileList),
});

export default function ProfilePage() {
	const { address } = useAccount();
	const abi = contractABI;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			bio: '',
			avatar: undefined,
			socialLinks: [''],
		},
	});
	const fileRef = form.register('avatar');
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		// @ts-ignore
		name: 'socialLinks',
	});

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

	const {
		data: savedProfileData,
		writeContract,
		isPending: isSavingProfile,
		error: saveProfileError,
	} = useWriteContract();

	useEffect(() => {
		if (!isProfileFetched) return;
		if (profileData[4] === true) {
			// form.reset({ username: profileData.username, avatar: undefined });
			form.setValue('username', profileData[0]);
			form.setValue('bio', profileData[1]);
			form.setValue('socialLinks', profileData[3]);
		}
	}, [profileData, isProfileFetched]);

	async function handleUploadAvatar(files: FileList) {
		try {
			const file = files[0];
			const formData = new FormData();
			formData.append('file', file);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				console.error('Failed to upload avatar');
				return;
			}

			const { IpfsHash } = await response.json();
			return IpfsHash;
		} catch (error) {
			console.error('Failed to upload avatar', error);
		}
	}

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		try {
			let avatarHash = 'QmQTL6Xbewa475QGvRzsNRgMUdeEF2iJqZZbt9mWi9Gtvy';
			// ----- UPLOAD AVATAR -----
			if (values.avatar) {
				const avatar = await handleUploadAvatar(values.avatar);
				if (avatar) {
					avatarHash = avatar;
				} else {
					throw new Error('Failed to upload avatar');
				}
			}
			// ----- SUBMIT PROFILE -----
			writeContract({
				address: process.env
					.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
				abi,
				functionName: 'upsertProfile',
				args: [
					values.username,
					values.bio,
					avatarHash,
					values.socialLinks,
				],
			});
		} catch (error) {
			console.error('Failed to submit profile', error);
		}
	}

	return (
		<div>
			ProfilePage
			<div>{JSON.stringify(profileData)}</div>
			<div>{JSON.stringify(fetchProfileError)}</div>
			<div>{isFetchingProfile.toString()}</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-5"
				>
					{/* ----- USERNAME ----- */}
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. John Doe"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Your name will be displayed on your profile.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* ----- BIO ----- */}
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bio</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Tell us about yourself"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Write a short bio less then 160 characters
									to introduce yourself. You can use markdown.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* ----- AVATAR HASH ----- */}
					<FormField
						control={form.control}
						name="avatar"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Avatar Hash</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept="image/*"
										{...fileRef}
									/>
								</FormControl>
								<FormDescription>
									Your avatar hash will be displayed on your
									profile.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* ----- LINKS ----- */}
					<FormField
						control={form.control}
						name="socialLinks"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Social Links</FormLabel>
								{fields.map((field, index) => (
									<div
										key={field.id}
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<FormControl>
											<Input
												placeholder="e.g. https://twitter.com/username"
												{...form.register(
													`socialLinks.${index}`
												)}
											/>
										</FormControl>
										<Button
											type="button"
											onClick={() => remove(index)}
										>
											Delete
										</Button>
									</div>
								))}
								<Button
									type="button"
									onClick={() => append('')}
								>
									Add Entry
								</Button>
								<FormDescription>
									You can add links to your social profiles.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<Button type="submit">Save</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
