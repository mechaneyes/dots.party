import { useRef, useState } from "react";
import dynamic from "next/dynamic";
const P5Mouse = dynamic(() => import("../components/p5Mouse"), { ssr: false });
// const MousePos = dynamic(() =>
//   import("../components/p5Mouse").then((mod) => mod.mousePos, {
//     ssr: false,
//   })
// );

const Mouse = () => {
  const [childMouse, setChildMouse] = useState(0);

  const sendMouseDeets = (mouseDeets) => {
    // console.log('mouseDeets', mouseDeets);
    setChildMouse(mouseDeets);
  };

  // ————————————————————————————————————o————————————————————————————————————o p5 -->
  // ————————————————————————————————————o p5 —>
  //

  return (
    <>
      <P5Mouse sendMouseDeets={sendMouseDeets} childMouse={childMouse} />
    </>
  );
};

export default Mouse;
