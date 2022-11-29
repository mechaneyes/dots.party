import Script from "next/script";
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });

export default function Home() {
  const [colorway, setColorway] = useState("colUtopia");

  const colorHandler = (colorClicked) => {
    setColorway(colorClicked);
    // console.log('colorClicked', colorClicked)
  };

  return (
    <>
      <Head>
        <title>Dots Dot Party</title>
        <meta property="og:title" content="Dots Dot Party" />
        <meta
          property="og:url"
          content="https://dots.party/"
        />
        <meta
          property="og:image"
          content="https://i.pinimg.com/originals/53/bf/0c/53bf0cb9dc37ae1e223dac5eb1c0519a.jpg"
        />
        <meta name="description" content="Hoo Gots the Dots?" />
      </Head>
      <div className="app">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V4X33FRRRS"
          strategy="afterInteractive"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-V4X33FRRRS');
      `}
        </Script>

        {/* <div className="navbar">
        <button onClick={() => colorHandler('colorwayGarden')}>
          <h3>🍖</h3>
        </button>
        <button onClick={() => colorHandler('colorwayStadium')}>
          <h3>🪬</h3>
        </button>
        <button onClick={() => colorHandler('colorwayUtopia')}>
          <h3>🏂</h3>
        </button>
      </div> */}
        <p className="feedback">
          <a href="mailto:ray@mechaneyes.com">feedback</a>
        </p>
        <DotOne colorway={colorway} />
      </div>
    </>
  );
}
