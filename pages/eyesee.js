import { useEffect, useState } from "react";
import io from "socket.io-client";

// The syntax for named exports is slightly different.
// You can use the widget with a dynamic import as follows:
// https://stackoverflow.com/a/65735539
// 
import dynamic from "next/dynamic";
const P5Rect = dynamic(
  () => import("../components/p5-rect").then((mod) => mod.P5Rect),
  { ssr: false }
);

let socket;

const Eyesee = () => {
  const [input, setInput] = useState("");

  useEffect(() => socketInitializer(), []);

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
      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
      <P5Rect />
    </>
  );
};

export default Eyesee;
