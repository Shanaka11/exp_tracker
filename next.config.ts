import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		authInterrupts: true,
	},
	images: {
		domains: ['five12daysgeneral.s3.ap-southeast-1.amazonaws.com'],
	},
};

export default nextConfig;
