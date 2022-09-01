import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";

import dynamic from "next/dynamic";
const P5Mouse = dynamic(() => import("../components/p5Mouse"), { ssr: false });
// const MousePos = dynamic(() =>
//   import("../components/p5Mouse").then((mod) => mod.mousePos, {
//     ssr: false,
//   })
// );

// let socket;
const Mouse = () => {
//   const [childMouse, setChildMouse] = useState(0);
  //   const [mouseInput, setMouseInput] = useState(0)

  // ————————————————————————————————————o————————————————————————————————————o socket.io -->
  // ————————————————————————————————————o socket.io —>
  //
//   useEffect(() => socketInitializer(), []);

//   const socketInitializer = async () => {
//     await fetch("/api/socket");
//     socket = io();

//     socket.on("connect", () => {
//       console.log("connected");
//     });

//     socket.on("update-mouse", (msg) => {
//       setChildMouse(msg);
//     });
//   };

//   const sendMouseDeets = (mouseDeets) => {
//     console.log('mouseDeets', mouseDeets);
//     setChildMouse(mouseDeets);
//     socket.emit("mouse-change", mouseDeets);
//   };

  return (
    <>
      {/* <P5Mouse sendMouseDeets={sendMouseDeets} childMouse={childMouse} /> */}
      <P5Mouse />
    </>
  );
};

export default Mouse;
