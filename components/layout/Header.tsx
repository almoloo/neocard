import Link from 'next/link';
import ConnectButton from './ConnectButton';
import { Afacad } from 'next/font/google';
import { UsersIcon } from 'lucide-react';

const afacad = Afacad({
	subsets: ['latin'],
	weight: ['700'],
});

export default function Header() {
	return (
		<header className="flex items-center justify-between bg-white px-5 py-3 border-b">
			<Link href="/">
				<strong
					className={`${afacad.className} flex items-center gap-2 text-2xl`}
				>
					<span className="bg-rose-400 p-2 rounded-full">
						<UsersIcon className="w-4 h-4 text-rose-900" />
					</span>
					<span>NeoCard</span>
				</strong>
			</Link>
			<ConnectButton />
		</header>
	);
}
