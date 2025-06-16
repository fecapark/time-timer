/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://time-timer.vercel.app",
  exclude: ["/sitemap.xml"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: ["https://time-timer.vercel.app/sitemap.xml"],
  },
};
