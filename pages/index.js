import dynamic from "next/dynamic";
import { useState } from "react";
const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });

export default function Home() {
  const [colorway, setColorway] = useState("colUtopia");
  const [enter, setEnter] = useState(true)

  return (
    <div className="app">
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
      {enter ? <button className="enter" onClick={(() => setEnter(false))}>enter</button> : ''}
      <DotOne colorway={colorway} />;
    </div>
  );
}
