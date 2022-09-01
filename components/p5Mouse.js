import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import p5 from "p5";

export let mousePos;
let socket;

const p5Mouse = () => {
  // ————————————————————————————————————o————————————————————————————————————o useRef() -->
  // ————————————————————————————————————o useRef() —>
  //
  // a state that should change as frequently as possible
  // but should not trigger full re-rendering of the component.
  // https://www.smashingmagazine.com/2020/11/react-useref-hook/#about-useref-hook
  //
  const mousePos = useRef(0);

  useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-mouse", (msg) => {
      mousePos.current = msg;
    });
  };

  useEffect(() => new p5(Sketch), []);

  const Sketch = (s) => {
    s.setup = () => {
      s.createCanvas(window.innerWidth, 200);
      s.noStroke();
      s.rectMode(s.CENTER);
    };

    s.draw = () => {
      s.background(230);
      let r1 = s.map(mousePos.current, 0, s.width, 0, s.height);
      let r2 = s.height - r1;

      s.fill(237, 34, 93, r1);
      s.rect(s.width / 2 + r1 / 2, s.height / 2, r1, r1);

      s.fill(237, 34, 93, r2);
      s.rect(s.width / 2 - r2 / 2, s.height / 2, r2, r2);
    };

    s.mouseMoved = () => {
      mousePos.current = s.mouseX;
      socket.emit("mouse-change", mousePos.current);
      console.log("mousePos.current", mousePos.current);
    };
  };

  return <div />;
};

export default p5Mouse;
