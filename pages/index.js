import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });
import Splash from "../components/Splash";
import Nudge from "../components/Nudge";

export default function Home() {
  const [colorway, setColorway] = useState("colUtopia");
  const [showSplash, setShowSplash] = useState(true);
  const [fader, setFader] = useState(false);

  let splashScreen = showSplash ? <Splash /> : null;

  const colorHandler = (colorClicked) => {
    setColorway(colorClicked);
    // console.log('colorClicked', colorClicked)
  };

  useEffect(() => {
    const handleClick = () => {
      setShowSplash(false);
    };

    document.addEventListener("click", handleClick);

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!showSplash) {
      setTimeout(() => {
        setFader(true);
      }, 1500);
    }
  }, [showSplash]);

  useEffect(() => {
    if (fader) {
      setTimeout(() => {
        setFader(false);
      }, 2000);

      const handleSecondClick = () => {
        setFader(false);
      };
      document.addEventListener("click", handleSecondClick);
      return () => {
        document.removeEventListener("click", handleSecondClick);
      };
    }
  }, [fader]);

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
        {splashScreen}
        {/* <CSSTransition
          in={showNudge}
          appear={showNudge}
          timeout={1000}
          classNames="fade"
          unmountOnExit
        >
          <Nudge />
        </CSSTransition> */}

        <Nudge fader={fader} />

        <div id="canvas-holder"></div>
        <p className="feedback">
          <a href="mailto:ray@mechaneyes.com">feedback</a>
        </p>
        <DotOne colorway={colorway} />
      </div>
    </>
  );
}
