import { useEffect, useState } from "react";
import io from "socket.io-client";
// import Mousey from '../components/reactMouse'

// import { ReactMouse } from '../components/mouse'

// The syntax for named exports is slightly different.
// You can use the widget with a dynamic import as follows:
// https://stackoverflow.com/a/65735539
//
import dynamic from "next/dynamic";
const Mousey = dynamic(
  () => import("../components/reactMouse").then((mod) => mod.MouseMv),
  { ssr: false }
);
// const EsMouse = dynamic(
//   () => import("../components/reactMouse").then((mod) => mod.mousePos),
//   { ssr: false }
// );

let socket;

const Eyesee = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <>
      <Mousey />
      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
    </>
  );
};

export default Eyesee;
