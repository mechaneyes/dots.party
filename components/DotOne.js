import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import p5 from "p5";

const DotOne = (props) => {
  const spreadDots = useRef(0);
  let theDot;
  let r;

  let socket;

  const [numPainters, setNumPainters] = useState(0);

  const numPaintersOnLoad = (numPaintersOnLoad) => {
    setTimeout(() => {
      setNumPainters(numPaintersOnLoad);
    }, 400);
  };

  // ————————————————————————————————————o————————————————————————————————————o socket.io -->
  // ————————————————————————————————————o socket.io —>
  //
  useEffect(() => socketInitializer(), [props]);

  const socketInitializer = async () => {
    await fetch("/api/socketDots");
    socket = io();

    socket.on("update-painters", (msg) => {
      setNumPainters(msg);
    });

    socket.on("first-load", (msg) => {
      numPaintersOnLoad(msg);
    });

    socket.on("update-dot", (msg) => {
      let externalDots = msg;
      spreadDots = [...externalDots];
    });
  };

  // ————————————————————————————————————o————————————————————————————————————o colors -->
  // ————————————————————————————————————o colors —>
  //
  // https://color.adobe.com/Cold-Garden-color-theme-20547576/
  const colorwayGarden = [
    [46, 56, 142, 95],
    [53, 101, 242, 95],
    [121, 217, 128, 85],
    [177, 242, 167, 95],
    [241, 242, 201, 95],
  ];

  // https://color.adobe.com/Stadium-Car---Trackmania-color-theme-20547493
  const colorwayStadium = [
    [72, 76, 115, 98],
    [242, 135, 68, 98],
    [242, 238, 121, 98],
    [242, 135, 68, 98],
    [242, 82, 68, 98],
  ];

  // https://color.adobe.com/UTOPIA-color-theme-20547494
  const colorwayUtopia = [
    [1, 22, 64, 98],
    [4, 118, 217, 98],
    [242, 184, 75, 98],
    [242, 116, 5, 98],
    [242, 25, 5, 98],
  ];

  // ————————————————————————————————————o color changes —>
  // state being set in function to enable resetting of
  // the p5 sketch when the colorway changes
  //
  const [colors, setColors] = useState(colorwayUtopia);

  const refreshColors = (cols) => {
    if (document.getElementsByTagName("canvas")) {
      let el = document.getElementsByTagName("canvas"),
        index;

      for (index = el.length - 1; index >= 0; index--) {
        el[index].parentNode.removeChild(el[index]);
      }

      // new p5(Sketch);
    }

    setColors(cols);

    // console.log(
    //   "// ————————————————————————————————————o " + props.colorway + " —>"
    // );
  };

  let rando = colors;
  let randChange = false

  useEffect(() => {
    rando = colors;
    // console.log("rando", rando[0]);
    // console.log('randChange', randChange)
  }, [colors]);

  useEffect(() => {
    randChange = true
    
    switch (props.colorway) {
      case "colorwayGarden":
        refreshColors(colorwayGarden);
        break;
      case "colorwayStadium":
        refreshColors(colorwayStadium);
        break;
      case "colorwayUtopia":
        refreshColors(colorwayUtopia);
        break;
    }
  }, [props.colorway]);

  // ————————————————————————————————————o————————————————————————————————————o p5 -->
  // ————————————————————————————————————o p5 —>
  //
  let sketcher;
  useEffect(() => (sketcher = new p5(Sketch)), []);

  const Sketch = (s) => {
    s.setup = () => {
      // s.createCanvas(window.innerWidth, window.innerHeight);
      s.createCanvas(453, 982);
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
    };

    const resetSketch = () => {
      const Dot = class {
        constructor(r) {
          // console.log('// ————————————————————————————————————o reset —>')
          // console.log("rando", rando[0]);

          let ranColor = colors[Math.floor(Math.random() * colors.length)];
  
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
    };

    if (randChange === true) {
      // console.log('randChange flipped', randChange)
    }

    // ————————————————————————————————————o————————————————————————————————————o dots classes -->
    // ————————————————————————————————————o dots classes —>
    //
    const Dot = class {
      constructor(r) {
        // console.log("rando", rando[0]);
        let ranColor = colors[Math.floor(Math.random() * colors.length)];

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
      <p className="num-collaborators">
        {numPainters <= 1
          ? "1 Collaborator Onlline"
          : numPainters + " Collaborators Onlline"}
      </p>
    </>
  );
};

export default DotOne;
