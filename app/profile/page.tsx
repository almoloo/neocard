'use client';
import { contractABI } from '@/lib/constants';
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
import { Skeleton } from '@/components/ui/skeleton';
import {
	LoaderIcon,
	PlusIcon,
	SaveIcon,
	Trash2Icon,
	UserIcon,
	UserPenIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export type Profile = [string, string, string, string[], boolean];

const formSchema = z.object({
	username: z.string().min(2).max(30),
	bio: z.string().max(160),
	socialLinks: z.array(z.string().url()),
	avatar: z.instanceof(globalThis.FileList),
});

export default function ProfilePage() {
	const { address } = useAccount();
	const abi = contractABI;

	const [saving, setSaving] = useState(false);
	const [profileAddress, setProfileAddress] = useState<string | null>(null);

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
			setProfileAddress(address as string);
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
		setSaving(true);
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
			toast('Failed to submit profile.');
		} finally {
			setSaving(false);
			toast('Profile updated successfully.');
			if (profileAddress === null) {
				setProfileAddress(address as string);
			}
		}
	}

	return (
		<>
			<section className="border-l-8 border-rose-500 bg-white p-5 mb-5 rounded-lg">
				<h1 className="flex items-center text-xl font-bold mb-2">
					<UserPenIcon className="w-6 h-6 mr-2 text-neutral-500" />
					Edit Profile
				</h1>
				<p className="text-sm text-neutral-600">
					Edit your profile to let others know more about you. You can
					add your name, bio, avatar and social links.
				</p>
				{profileAddress && (
					<p className="text-sm text-neutral-600 mt-1">
						You can view your profile{' '}
						<Link
							href={`/user/${profileAddress}`}
							className="text-rose-500 hover:underline"
						>
							here
						</Link>
					</p>
				)}
			</section>
			<div className="flex flex-col lg:grid lg:grid-cols-5">
				{isFetchingProfile ? (
					<div className="lg:col-span-3 flex flex-col gap-5">
						<section className="flex flex-col gap-3">
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-8" />
							<Skeleton className="h-4 w-[300px]" />
						</section>
						<section className="flex flex-col gap-3">
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-8" />
							<Skeleton className="h-4 w-[300px]" />
						</section>
						<section className="flex flex-col gap-3">
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-8" />
							<Skeleton className="h-4 w-[300px]" />
						</section>
						<section className="flex flex-col gap-3">
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-8" />
							<Skeleton className="h-4 w-[300px]" />
						</section>
					</div>
				) : (
					<div className="lg:col-span-3">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleSubmit)}
								className="space-y-5"
							>
								{/* ----- USERNAME ----- */}
								<FormField
									control={form.control}
									name="username"
									disabled={saving || isSavingProfile}
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
												Your name will be displayed on
												your profile.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* ----- BIO ----- */}
								<FormField
									control={form.control}
									name="bio"
									disabled={saving || isSavingProfile}
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
												Write a short bio less then 160
												characters to introduce
												yourself. You can use markdown.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* ----- AVATAR HASH ----- */}
								<FormField
									control={form.control}
									name="avatar"
									disabled={saving || isSavingProfile}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Avatar</FormLabel>
											<FormControl>
												<Input
													type="file"
													accept="image/*"
													disabled={
														saving ||
														isSavingProfile
													}
													{...fileRef}
												/>
											</FormControl>
											<FormDescription>
												Your avatar will be displayed on
												your profile.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* ----- LINKS ----- */}
								<FormField
									control={form.control}
									name="socialLinks"
									disabled={saving || isSavingProfile}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Social Links</FormLabel>
											{fields.map((field, index) => (
												<div
													key={field.id}
													className="flex items-center gap-2"
												>
													<FormControl>
														<Input
															placeholder="e.g. https://twitter.com/username"
															disabled={
																saving ||
																isSavingProfile
															}
															{...form.register(
																`socialLinks.${index}`
															)}
														/>
													</FormControl>
													<Button
														type="button"
														variant="destructive"
														disabled={
															saving ||
															isSavingProfile
														}
														onClick={() =>
															remove(index)
														}
													>
														<Trash2Icon className="w-4 h-4" />
													</Button>
												</div>
											))}
											<Button
												type="button"
												onClick={() => append('')}
												variant="outline"
												disabled={
													saving || isSavingProfile
												}
											>
												<PlusIcon className="w-4 h-4 mr-2" />
												Add Link
											</Button>
											<FormDescription>
												You can add links to your social
												profiles.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex items-center gap-2">
									<Button
										type="submit"
										disabled={saving || isSavingProfile}
									>
										{saving || isSavingProfile ? (
											<LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
										) : (
											<SaveIcon className="w-4 h-4 mr-2" />
										)}
										Save Profile
									</Button>
									{profileAddress && (
										<Link
											href={`/user/${profileAddress}`}
											passHref
										>
											<Button
												variant="link"
												type="button"
											>
												<UserIcon className="w-4 h-4 mr-2" />
												View Profile
											</Button>
										</Link>
									)}
								</div>
							</form>
						</Form>
					</div>
				)}
			</div>
		</>
	);
}
