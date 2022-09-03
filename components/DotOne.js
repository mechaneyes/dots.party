import { useRef, useEffect } from "react";
import io from "socket.io-client";
import p5 from "p5";

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

  let r;
  let socket;

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
      s.background(0);
    };

    // ————————————————————————————————————o draw —>
    //
    s.draw = () => {
      if (s.mouseIsPressed === true) {
        r += 2;
        theDot.current = new Dot(r);

        console.log('theDot.current.red', theDot.current.red)

        socket.emit("add-dot", [
          theDot.current.x,
          theDot.current.y,
          theDot.current.r,
          theDot.current.red,
          theDot.current.green,
          theDot.current.blue,
        ]);
      }

      let externalDots = new ExternalDot(
        spreadDots[0],
        spreadDots[1],
        spreadDots[2],
        spreadDots[3],
        spreadDots[4],
        spreadDots[5]
      );
    };

    s.mousePressed = () => {
      r = 20;
    };

    // ————————————————————————————————————o dot class —>
    //
    const Dot = class {
      constructor(r) {
        this.x = s.mouseX;
        this.y = s.mouseY;
        this.r = r;
        this.red = s.random(255)
        this.green = s.random(255)
        this.blue = s.random(255)

        s.noStroke;
        s.fill(this.red, this.green, this.blue);
        s.circle(this.x, this.y, this.r);
      }
    };

    // ————————————————————————————————————o external dot class —>
    //
    const ExternalDot = class {
      constructor(x, y, r, red, green, blue) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.red = red
        this.green = green
        this.blue = blue

        s.noStroke;
        s.fill(this.red, this.green, this.blue);
        s.circle(this.x, this.y, this.r);
      }
    };
  };

  return null;
};

export default DotOne;
