import Script from "next/script";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useAtom } from "jotai";
import { qrAtom } from "../abstracts/jotaiAtoms";

const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });
import Splash from "../components/Splash";

export default function Home() {
  const [colorway, setColorway] = useState("colUtopia");
  const [qr, setQr] = useAtom(qrAtom);
  const [showSplash, setShowSplash] = useState(true);

  let splashScreen = showSplash ? <Splash /> : null;

  const colorHandler = (colorClicked) => {
    setColorway(colorClicked);
    // console.log('colorClicked', colorClicked)
  };

  useEffect(() => {
    const handleClick = () => {
      setShowSplash(false);
    };

    document.addEventListener('click', handleClick);

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Dots Dot Party</title>
        <meta name="description" content="Hoo Gots the Dots?" />
        <meta property="og:url" content="https://dots.party/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dots.Party" />
        <meta property="og:description" content="Hoo Gots the Dots?" />
        <meta
          property="og:image"
          content="https://dots.party/images/dots-dot-party-1.1.0.jpg"
        />
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
        {splashScreen}
        <div id="canvas-holder"></div>
        <p className="feedback">
          <a href="mailto:ray@mechaneyes.com">feedback</a>
        </p>
        <DotOne colorway={colorway} />
      </div>
    </>
  );
}
