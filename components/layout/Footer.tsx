import { CodeIcon, GithubIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
	return (
		<footer className="bg-slate-100 flex items-center justify-between gap-5 p-5">
			<div className="flex items-center">
				<CodeIcon className="w-4 h-4 mr-2 text-rose-300 shrink-0" />
				<small>
					Designed & Developed by{' '}
					<Link
						href="https://github.com/almoloo"
						className="text-rose-500 hover:text-red-700 hover:underline"
						target="_blank"
					>
						Ali Mousavi
					</Link>{' '}
					for the{' '}
					<Link
						href="https://www.hackquest.io/en/hackathon/explore/NEO-X-Grind-Hackathon-HackQuest-Edition"
						className="text-rose-500 hover:text-red-700 hover:underline"
						target="_blank"
					>
						Neo X Grind Hackathon
					</Link>
				</small>
			</div>
			<Link
				href="https://github.com/almoloo/neocard"
				title="View on GitHub"
			>
				<GithubIcon className="w-4 h-4 text-rose-300 hover:text-red-700 cursor-pointer" />
			</Link>
		</footer>
	);
}
