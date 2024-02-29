import Script from "next/script";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useAtom } from "jotai";
import { qrAtom } from "../abstracts/jotaiAtoms";

const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });

export default function Home() {
  const [colorway, setColorway] = useState("colUtopia");
  const [qr, setQr] = useAtom(qrAtom);

  const colorHandler = (colorClicked) => {
    setColorway(colorClicked);
    // console.log('colorClicked', colorClicked)
  };

  useEffect(() => {
    setQr(true);
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
      <div className="app app--qr">
        <Image
            src="/images/dots.party-qr.gif"
            alt="qr code linking to https://dots.party"
            className="qr-code"
            width={300}
            height={300}
        />
        <p className="feedback">
          <a href="mailto:ray@mechaneyes.com">feedback</a>
        </p>
        <DotOne colorway={colorway} />
      </div>
    </>
  );
}
