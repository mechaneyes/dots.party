import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import p5 from "p5";

const DotOne = (props) => {
  const [numPaintersOnLoad, setNumPaintersOnLoad] = useState(0);
  const [numPainters, setNumPainters] = useState(0);

  let socket;
  let spreadDots = useRef(0);

  let r = 20;

  useEffect(() => {
    socket = io("https://dots.party/api/socket-server/", { path: '/api/socket-server' }); 

    // Receive dots from other users:
    socket.on("broadcast-dot", (dotData) => {
      // Access dotData (x, y, r, red, green, blue, opacity)
      // Use your `ExternalDot` class to draw it
      let externalDot = new ExternalDot(...dotData);
    });

    // Update painter count:
    socket.on("update-painters", (numPainters) => {
      setNumPainters(numPainters);
    });
  }, []);

  useEffect(() => {
    setNumPainters(numPaintersOnLoad);
  }, [numPaintersOnLoad]);

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

  let rando = colors;
  let randChange = false;

  useEffect(() => {
    rando = colors;
    // console.log("rando", rando[0]);
    // console.log('randChange', randChange)
  }, [colors]);

  useEffect(() => {
    randChange = true;

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
    }

    // New method to render the dot with p5:
    draw(s) {
      // Pass in the p5 instance 's'
      s.noStroke();
      s.fill(this.red, this.green, this.blue, this.opacity);
      s.circle(this.x, this.y, this.r);
    }
  };

  let sketcher;
  useEffect(() => (sketcher = new p5(Sketch)), []);

  const Sketch = (s) => {
    socket.on("broadcast-dot", (dotData) => {
      let externalDot = new ExternalDot(...dotData);
      externalDot.draw(s);
    });

    let currentColors = colors;

    s.setup = () => {
      const canvasDiv = document.getElementById("canvas-holder");
      const width = canvasDiv.offsetWidth;
      const height = canvasDiv.offsetHeight;

      const canvas = s.createCanvas(width, height);
      canvas.parent("canvas-holder");
      s.noStroke();
      s.background(0);
    };

    let theDot;

    // Send a dot when drawn (adjust this to fit your drawing logic)
    s.draw = () => {
      if (colors !== currentColors) {
        // Check if colors have changed
        s.background(0); // Clear to black
        currentColors = colors; // Update
      }

      if (s.mouseIsPressed === true) {
        // Create a new 'Dot' object when the mouse is pressed
        r += 2;
        theDot = new Dot(r);

        // Emit to the server
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
    };

    s.mouseReleased = () => {
      r = 10;
    };

    s.touchEnded = () => {
      r = 10;
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
