/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://timer.fecapark.com",
  exclude: ["/sitemap.xml"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: ["https://timer.fecapark.com/sitemap.xml"],
  },
};
