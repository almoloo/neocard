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
	eslint: {
		// Warning: This allows production builds to successfully complete even if your project has ESLint errors.
		// This is bad practice, as you should always ensure your code is error-free before deploying.
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
