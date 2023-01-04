/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  // dest: "public",
  customWorkerDir: "worker",
});
const isDevServer = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: isDevServer ? "/absproxy/3000" : "",
};

module.exports = withPWA(nextConfig);
// module.exports = nextConfig;
