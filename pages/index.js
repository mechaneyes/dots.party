import Script from "next/script";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });

export default function Home() {
  const [colorway, setColorway] = useState("colUtopia");
  const [dbHidden, setDbHidden] = useState(false);


  // Hide splash page when clicking on canvas
  // 
  useEffect(() => {
    setTimeout(() => {
      const allWithClass = Array.from(
        document.getElementsByClassName("p5Canvas")
      );
      allWithClass.forEach((can) => {
        can.addEventListener("mousedown", function() {
          console.log('can')
          setDbHidden(true)
        });
      })
    }, 400);
  }, []);

  return (
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
      <p className="feedback">
        <a href="mailto:ray@mechaneyes.com">feedback</a>
      </p>
      {!dbHidden ? (
        <div className="doorbell" onClick={() => setDbHidden(true)}>
          <div className="doorbell_inner">
            <div className="dot dot--top-left"></div>
            <div className="dot dot--top-right"></div>

            <button className="enter">
              <div>tap</div> <div>tap</div> <div>tap</div>
            </button>
            <div className="dot dot--bottom-left"></div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <p className="num-painters">there {numPainters == 1 ? (`is ${numPainters} painter here`) : (`are  ${numPainters}s painter here`) }</p> */}
      <DotOne colorway={colorway} />;
    </div>
  );
}
