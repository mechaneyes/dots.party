import { useRef, useEffect } from "react";
import io from "socket.io-client";
import p5 from "p5";

export let mousePos;
let socket;

const DotOne = () => {
  // ————————————————————————————————————o————————————————————————————————————o useRef() -->
  // ————————————————————————————————————o useRef() —>
  //
  // a state that should change as frequently as possible
  // but should not trigger full re-rendering of the component.
  // https://www.smashingmagazine.com/2020/11/react-useref-hook/#about-useref-hook
  //
  const theDot = useRef(0);
  const spreadDots = useRef(0);
  //   let spreadDots

  // ————————————————————————————————————o————————————————————————————————————o socket.io -->
  // ————————————————————————————————————o socket.io —>
  //
  useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch("/api/socketDots");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-dot", (msg) => {
      let externalDots = msg;
      //   console.log('externalDots.current', ...externalDots)
      spreadDots = [...externalDots];
      //   console.log('spreadDots', spreadDots[0], spreadDots[1])
    });
  };

  // ————————————————————————————————————o————————————————————————————————————o p5 -->
  // ————————————————————————————————————o p5 —>
  //
  useEffect(() => new p5(Sketch), []);

  const Sketch = (s) => {
    s.setup = () => {
      s.createCanvas(window.innerWidth, window.innerHeight);
      s.noStroke();
      s.rectMode(s.CENTER);
      s.background(0);
    };

    let dot;
    let rad;
    let externalDots;

    // ————————————————————————————————————o draw —>
    //
    s.draw = () => {
      if (s.mouseIsPressed === true) {
        rad += 2;
        theDot.current = new Dot(rad);

        socket.emit("add-dot", [
          theDot.current.x,
          theDot.current.y,
          theDot.current.rad,
        ]);
        // console.log("theDot.current", theDot.current);
      }

      console.log("spreadDots", spreadDots[0], spreadDots[1]);
      externalDots = new ExternalDot(
        spreadDots[0],
        spreadDots[1],
        spreadDots[2]
      );
    };

    s.mousePressed = () => {
      rad = 20;
    };

    // ————————————————————————————————————o dot class —>
    //
    let Dot = class {
      constructor(rad) {
        this.x = s.mouseX;
        this.y = s.mouseY;
        this.rad = rad;

        s.noStroke;
        s.fill(s.random(255), s.random(255), s.random(255));
        s.circle(this.x, this.y, this.rad);
      }
    };

    let ExternalDot = class {
      constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;

        s.noStroke;
        s.fill(s.random(255), s.random(255), s.random(255));
        s.circle(this.x, this.y, this.rad);
      }
    };
  };

  return null;
};

export default DotOne;
