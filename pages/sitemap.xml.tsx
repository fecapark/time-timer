import { GetServerSidePropsContext } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

//(2)
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const lastmod = new Date().toISOString();
  const BASE_URL = process.env.URL || "https://timer.fecapark.com";

  const fields: ISitemapField[] = [
    {
      loc: BASE_URL,
      changefreq: "daily",
      priority: 1.0,
      lastmod,
    },
    {
      loc: `${BASE_URL}/records`,
      changefreq: "daily",
      priority: 0.9,
      lastmod,
    },
  ];

  return getServerSideSitemap(ctx, fields);
};
//(8)
export default () => {
  return;
};
