import { useRef, useEffect, useState } from "react";
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
  // const theDot = useRef(0);
  const spreadDots = useRef(0);
  let theDot;
  let r;

  let socket;

  const [numPainters, setNumPainters] = useState(0);

  const firstNum = (firstNum) => {
    setTimeout(() => {
      setNumPainters(firstNum);
    }, 400)
  }

  // ————————————————————————————————————o————————————————————————————————————o socket.io -->
  // ————————————————————————————————————o socket.io —>
  //
  useEffect(() => socketInitializer(), [props]);

  const socketInitializer = async () => {
    await fetch("/api/socketDots");
    socket = io();

    socket.on("update-painters", (msg) => {
      setNumPainters(msg);
      // firstNum(msg)
      console.log("numPainters", msg);
    });

    socket.on("first-load", (msg) => {
      firstNum(msg)
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
  // https://color.adobe.com/Cold-Garden-color-theme-20547576/
  const colColdGarden = [
    [46, 56, 142, 95],
    [53, 101, 242, 95],
    [121, 217, 128, 85],
    [177, 242, 167, 95],
    [241, 242, 201, 95],
  ];

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

  const [colors, setColors] = useState(colUtopia);
  // let colorsNoState

  const refreshCols = (cols) => {
    if (document.getElementsByTagName("canvas")) {
      let el = document.getElementsByTagName("canvas"),
        index;

      for (index = el.length - 1; index >= 0; index--) {
        el[index].parentNode.removeChild(el[index]);
      }

      // theDot = 0
      // colors = colColdGarden
      setColors(null);
      setColors(cols);

      new p5(Sketch);
    }

    console.log(
      "// ————————————————————————————————————o " + props.colorway + " —>"
    );
    console.log("// ————————————————————————————————————o —>");
  };

  useEffect(() => {
    switch (props.colorway) {
      case "colColdGarden":
        refreshCols(colColdGarden);
        break;
      case "colStadiumCar":
        refreshCols(colStadiumCar);
        break;
      case "colUtopia":
        refreshCols(colUtopia);
        break;
    }
  }, [props]);

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
        theDot = new Dot(r);
        // console.log('theDot', theDot)

        // ————————————————————————————————————o socket.emit —>
        //
        socket.emit("add-dot", [
          theDot.x,
          theDot.y,
          theDot.r,
          theDot.red,
          theDot.green,
          theDot.blue,
          theDot.opacity,
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
      // selectedColorway = colColdGarden;
    };

    // ————————————————————————————————————o————————————————————————————————————o dots classes -->
    // ————————————————————————————————————o dots classes —>
    //
    const Dot = class {
      constructor(r) {
        console.log("colors", colors[0]);
        var ranColor = colors[Math.floor(Math.random() * colors.length)];

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

  return (
    <>
      <p className="num-painters">
        {numPainters <= 1
          ? "1 Painter Present"
          : numPainters + " Painters Present"}
      </p>
    </>
  );
};

export default DotOne;
