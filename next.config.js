/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "files.edgestore.dev"
			}
		]
	},

	crossOrigin: "anonymous",

	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreBuildErrors: true
	}
};

module.exports = nextConfig;
