import Script from "next/script";

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

export default function Seo() {
  return <>{process.env.NODE_ENV === "development" ? <Eruda /> : null}</>;
}
