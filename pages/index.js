import dynamic from "next/dynamic";
import Head from "next/head";

const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });
import RotateDevice from "../components/RotateDevice";
import Splash from "../components/Splash";
import Nudge from "../components/Nudge";
import ToggleFullscreen from "../components/ToggleFullscreen";

export default function Home() {
  const colorway = "colUtopia";

  return (
    <>
      <Head>
        <title>Dots Dot Party</title>
        <meta name="description" content="May the Dots be with you" />
        <meta property="og:url" content="https://dots.party/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dots.Party" />
        <meta property="og:description" content="May the Dots be with you" />
        <meta
          property="og:image"
          content="https://dots.party/images/dots-dot-party-1.1.0.jpg"
        />
      </Head>
      <div className="app">
        {/* <ToggleFullscreen /> */}
        <RotateDevice />
        <Splash />
        <Nudge />
        <div id="canvas-holder"></div>
        <DotOne colorway={colorway} />
      </div>
    </>
  );
}
