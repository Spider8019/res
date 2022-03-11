import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* google adsense */}
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
          <script dangerouslySetInnerHTML={{
              __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                  google_ad_client: "pub-5871634443514718",
                  enable_page_level_ads: true
                  });
                  `,
                  }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
