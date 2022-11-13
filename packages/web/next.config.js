/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
	unoptimized: true
  },
  basePath: "/simple-voice-recorder/"
}

module.exports = nextConfig
