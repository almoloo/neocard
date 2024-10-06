import Link from 'next/link';
import { Button } from '../ui/button';
import {
	FacebookIcon,
	GithubIcon,
	InstagramIcon,
	LinkedinIcon,
	LinkIcon,
	SendIcon,
	TwitchIcon,
	TwitterIcon,
	YoutubeIcon,
} from 'lucide-react';

interface LinkItemProps {
	link: string;
	index: number;
}

export default function LinkItem({ link, index }: LinkItemProps) {
	let linkIcon: null | React.ReactNode = null;
	if (link.includes('twitter.com')) {
		linkIcon = <TwitterIcon className="w-4 h-4 mr-2" />;
	} else if (link.includes('facebook.com')) {
		linkIcon = <FacebookIcon className="w-4 h-4 mr-2" />;
	} else if (link.includes('instagram.com')) {
		linkIcon = <InstagramIcon className="w-4 h-4 mr-2" />;
	} else if (link.includes('linkedin.com')) {
		linkIcon = <LinkedinIcon className="w-4 h-4 mr-2" />;
	} else if (link.includes('github.com')) {
		linkIcon = <GithubIcon className="w-4 h-4 mr-2" />;
	} else if (link.includes('youtube.com')) {
		linkIcon = <YoutubeIcon className="w-4 h-4 mr-2" />;
	} else if (link.includes('twitch.com')) {
		linkIcon = <TwitchIcon className="w-4 h-4 mr-2" />;
	} else if (link.includes('telegram.com')) {
		linkIcon = <SendIcon className="w-4 h-4 mr-2" />;
	} else {
		linkIcon = <LinkIcon className="w-4 h-4 mr-2" />;
	}

	return (
		<Link
			href={link}
			key={index}
			target="_blank"
			passHref
		>
			<Button
				size="lg"
				variant="ghost"
				title={link}
				className="w-full justify-start"
			>
				{linkIcon}
				{link}
			</Button>
		</Link>
	);
}
