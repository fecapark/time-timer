/** @type {import('next').NextConfig} */

const isDevServer = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: isDevServer ? "/absproxy/3000" : "",
};

module.exports = nextConfig;
