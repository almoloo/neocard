import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/Header';
import { Providers } from '@/components/layout/Providers';
import Footer from '@/components/layout/Footer';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'NeoCard',
	description:
		'Your decentralized identity, powered by Neo X. Share who you are, with complete control.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Header />
					<main className="flex flex-col grow">{children}</main>
					<Footer />
				</body>
			</html>
		</Providers>
	);
}
