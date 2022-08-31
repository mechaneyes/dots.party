import { useRef, useState } from "react";

import dynamic from "next/dynamic";
const P5Mouse = dynamic(() => import("../components/p5Mouse"), { ssr: false });

// Passing data child to parent functional components in reactjs
// https://stackoverflow.com/a/63432008/4811066

const Mouse = () => {
  const [childMouse, setChildMouse] = useState(0);
  const childRef = useRef(null);

  const sendMouseDeets = (mouseDeets) => {
    console.log(mouseDeets);
    setChildMouse(mouseDeets);
  };

  //   setChildMouse(childRef)

  //   const [input, setInput] = useState("");

  //   useEffect(() => {
  //     socketInitializer();
  //   }, []);

  //   const socketInitializer = async () => {
  //     await fetch("/api/socket");
  //     socket = io();

  //     socket.on("connect", () => {
  //       console.log("connected");
  //     });

  //     socket.on("update-input", (msg) => {
  //       setInput(msg);
  //     });
  //   };

  //   const onChangeHandler = (e) => {
  //     setInput(e.target.value);
  //     socket.emit("input-change", e.target.value);
  //   };

  //   console.log('MousePos', MousePos)

  return (
    <>
      <P5Mouse sendMouseDeets={sendMouseDeets} />
    </>
  );
};

export default Mouse;
