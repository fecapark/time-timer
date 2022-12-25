import Head from "next/head";
import Script from "next/script";

interface IProps {
  title: string;
  description: string;
}

function Eruda() {
  return (
    <>
      <Script
        id="eruda-script"
        src="//cdn.jsdelivr.net/npm/eruda"
        strategy="beforeInteractive"
      />
      <Script
        id="eruda-init"
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: `eruda.init();` }}
      ></Script>
    </>
  );
}

export default function Seo({ title, description }: IProps) {
  return (
    <>
      {process.env.NODE_ENV === "development" ? <Eruda /> : null}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </>
  );
}
