/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});
const isDevServer = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = isDevServer ? nextConfig : withPWA(nextConfig);
