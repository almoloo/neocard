/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.mypinata.cloud',
				port: '',
			},
		],
	},
};

export default nextConfig;
