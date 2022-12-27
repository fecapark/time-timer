import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { Theme } from "../styles/theme";

function TwitterCardMetaSet() {
  return (
    <>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Time Timer | 타임 타이머" />
      <meta
        name="twitter:description"
        content="최고의 집중을 위해 제작된 1시간 타이머를 웹에서 무료로 이용해보세요."
      />
      <meta name="twitter:image" content="/share-thumbnail.png" />
    </>
  );
}

function OpenGraphMetaSet() {
  return (
    <>
      <meta property="og:url" content="https://timer.fecapark.com" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/share-thumbnail.png" />
      <meta
        property="og:description"
        content="최고의 집중을 위해 제작된 1시간 타이머를 웹에서 무료로 이용해보세요."
      />
      <meta property="og:title" content="Time Timer | 타임 타이머"></meta>
    </>
  );
}

function MetaIconSet() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/final-logo.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#1f1f1f" />
      <meta name="theme-color" content={Theme.background.primary} />
    </>
  );
}

function FontSet() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      />
    </>
  );
}

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="author" content="Sanghyeok Park, fecapark" />
          <meta name="apple-mobile-web-app-title" content="Time Timer" />
          <MetaIconSet />
          <TwitterCardMetaSet />
          <OpenGraphMetaSet />
          <FontSet />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
