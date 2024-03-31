import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });
import Splash from "../components/Splash";
import Nudge from "../components/Nudge";

export default function Home() {
  const [colorway, setColorway] = useState("colUtopia");
  const [fader, setFader] = useState(false);
  const [splashFader, setSplashFader] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const colorHandler = (colorClicked) => {
    setColorway(colorClicked);
    // console.log('colorClicked', colorClicked)
  };

  let elem;

  useEffect(() => {
    elem = document.querySelector(".toggle-full");
  }, []);

  /* View in fullscreen */
  const openFullscreen = () => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  /* Close fullscreen */
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
  }

  useEffect(() => {
    const handleClick = () => {
      setSplashFader(false);
    };

    document.addEventListener("click", handleClick);

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!splashFader) {
      setTimeout(() => {
        setFader(true);
      }, 1800);
    }
  }, [splashFader]);

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
        <Splash fader={splashFader} />
        <Nudge fader={fader} />

        <div id="canvas-holder"></div>
        <p
          className="toggle-full"
          onClick={toggleFullscreen}
        >
          toggle
        </p>
        <DotOne colorway={colorway} />
      </div>
    </>
  );
}
