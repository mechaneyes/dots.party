import { useRef, useEffect } from "react";
import io from "socket.io-client";
import p5 from "p5";

const DotOne = (props) => {
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

  console.log("props", props);

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
      spreadDots = [...externalDots];
      // console.log("spreadDots", spreadDots[0], spreadDots[1]);
      // console.log('externalDots.current', ...externalDots)
    });
  };

  // ————————————————————————————————————o————————————————————————————————————o colors -->
  // ————————————————————————————————————o colors —>
  //
  let selectedClrwy;
  // https://color.adobe.com/Stadium-Car---Trackmania-color-theme-20547493
  const colStadiumCar = [
    [72, 76, 115, 98],
    [242, 135, 68, 98],
    [242, 238, 121, 98],
    [242, 135, 68, 98],
    [242, 82, 68, 98],
  ];

  // https://color.adobe.com/UTOPIA-color-theme-20547494
  const colUtopia = [
    [1, 22, 64, 98],
    [4, 118, 217, 98],
    [242, 184, 75, 98],
    [242, 116, 5, 98],
    [242, 25, 5, 98],
  ];

  // https://color.adobe.com/Cold-Garden-color-theme-20547576/
  const colColdGarden = [
    [46, 56, 142, 95],
    [53, 101, 242, 95],
    [121, 217, 128, 85],
    [177, 242, 167, 95],
    [241, 242, 201, 95],
  ];

  switch (props.colorway) {
    case "colStadiumCar":
      selectedClrwy = colStadiumCar;
      console.log("colStadiumCarcolStadiumCar");
      break;
    case "colUtopia":
      selectedClrwy = colUtopia;
      console.log("colUtopiacolUtopia");
      break;
    case "colColdGarden":
      selectedClrwy = colColdGarden;
      console.log("colColdGardencolColdGarden", selectedClrwy);
      break;
  }

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

    // ————————————————————————————————————o p5 draw —>
    //
    s.draw = () => {
      if (s.mouseIsPressed === true) {
        r += 2;
        theDot.current = new Dot(r);

        // console.log(
        //   "theDot",
        //   theDot.current.red,
        //   theDot.current.green,
        //   theDot.current.blue
        // );

        // ————————————————————————————————————o socket.emit —>
        //
        socket.emit("add-dot", [
          theDot.current.x,
          theDot.current.y,
          theDot.current.r,
          theDot.current.red,
          theDot.current.green,
          theDot.current.blue,
          theDot.current.opacity,
        ]);
      }

      let externalDots = new ExternalDot(
        spreadDots[0],
        spreadDots[1],
        spreadDots[2],
        spreadDots[3],
        spreadDots[4],
        spreadDots[5],
        spreadDots[6]
      );
    };

    s.mousePressed = () => {
      r = 20;
    };

    // ————————————————————————————————————o————————————————————————————————————o dots classes -->
    // ————————————————————————————————————o dots classes —>
    //
    const Dot = class {
      constructor(r) {
        let ranColor =
          selectedClrwy[Math.floor(Math.random() * selectedClrwy.length)];
        this.x = s.mouseX;
        this.y = s.mouseY;
        this.r = r;
        this.red = ranColor[0];
        this.green = ranColor[1];
        this.blue = ranColor[2];
        this.opacity = ranColor[3];

        s.noStroke;
        s.fill(this.red, this.green, this.blue, this.opacity);
        s.circle(this.x, this.y, this.r);
      }
    };

    // ————————————————————————————————————o external dot class —>
    //
    const ExternalDot = class {
      constructor(x, y, r, red, green, blue, opacity) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.opacity = opacity;

        s.noStroke;
        s.fill(this.red, this.green, this.blue, this.opacity);
        s.circle(this.x, this.y, this.r);
      }
    };
  };

  return null;
};

export default DotOne;
