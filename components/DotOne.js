import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import p5 from "p5";
import { ref, push } from 'firebase/database';

import database from '../firebaseConfig';

// ————————————————————————————————————o colors —>
// 
// https://color.adobe.com/UTOPIA-color-theme-20547494
const colors = [
  [1, 22, 64, 98],
  [4, 118, 217, 98],
  [242, 184, 75, 98],
  [242, 116, 5, 98],
  [242, 25, 5, 98],
];

const DotOne = () => {
  const [numCollaborators, setNumCollaborators] = useState(0);

  let socket;
  let externalDots = [];
  let r = 20;

  // ————————————————————————————————————o————————————————————————————————————o classes -->
  // ————————————————————————————————————o dots class —>
  //
  const Dot = class {
    constructor(s, r) {
      let ranColor = colors[Math.floor(Math.random() * colors.length)];

      this.x = s.mouseX;
      this.y = s.mouseY;
      this.r = r;
      this.red = ranColor[0];
      this.green = ranColor[1];
      this.blue = ranColor[2];
      this.opacity = ranColor[3];

      // Emit to the server
      socket.emit("add-dot", {
        x: this.x,
        y: this.y,
        r: this.r,
        color: ranColor,
      });

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
    }

    // New method to render the dot with p5:
    draw(s) {
      // Pass in the p5 instance 's'
      s.noStroke();
      s.fill(this.red, this.green, this.blue, this.opacity);
      s.circle(this.x, this.y, this.r);
    }
  };

  // ————————————————————————————————————o————————————————————————————————————o p5 -->
  // ————————————————————————————————————o p5 —>
  //
  let sketcher;
  useEffect(() => (sketcher = new p5(Sketch)), []);

  const Sketch = (s) => {
    const setupSocketConnection = async () => {
      try {
        socket = io(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '', {
          transports: ['websocket'],
        });

        socket.on("update-collaborators", (collaborators) => {
          setNumCollaborators(collaborators);
        });

        socket.on("broadcast-dot", (dotData) => {
          let externalDot = new ExternalDot(...dotData);
          externalDot.draw(s);
        });
      } catch (error) {
        console.error("Error initializing WebSocket connection:", error);
      }
    };

    setupSocketConnection();

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
        const theDot = new Dot(s, r);

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

      // Render received dots
      externalDots.forEach((dot) => dot.draw(s));
    };

    s.mouseReleased = () => {
      r = 10;
    };

    s.touchEnded = () => {
      r = 10;
    };
  };

  return (
    <>
      <p className="num-collaborators">
        {numCollaborators <= 1
          ? "1 Collaborator Onlline"
          : numCollaborators + " Collaborators Onlline"}
      </p>
    </>
  );
};

export default DotOne;
