import Script from "next/script";
import { useState } from "react";
import dynamic from "next/dynamic";
const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });

export default function Home() {
  const [colorway, setColorway] = useState("colUtopia");
  const [enter, setEnter] = useState(true);

  return (
    <div className="app">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'GA_MEASUREMENT_ID');
      `}
      </Script>
      <div className="navbar">
        {/* <button onClick={() => setColorway("colColdGarden")}>
          <h3>🍖</h3>
        </button>
        <button onClick={() => setColorway("colStadiumCar")}>
          <h3>🪬</h3>
        </button>
        <button onClick={() => setColorway("colUtopia")}>
          <h3>🏂</h3>
        </button> */}
      </div>
      {enter ? (
        <button className="enter" onClick={() => setEnter(false)}>
          enter
        </button>
      ) : (
        ""
      )}
      <DotOne colorway={colorway} />;
    </div>
  );
}
