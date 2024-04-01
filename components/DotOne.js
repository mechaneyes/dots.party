import { useEffect, useState } from "react";
import p5 from "p5";
import supabase from './supabaseClient';

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
  const [externalDots, setExternalDots] = useState([]);
  
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

  useEffect(() => {
    sketcher = new p5(Sketch);

    // Return a cleanup function
    return () => {
      sketcher.remove();
    };
  }, []);

  // ————————————————————————————————————o————————————————————————————————————o supabase realtime -->
  // ————————————————————————————————————o supabase realtime —>
  //
  // Initialization of Supabase real-time updates
  useEffect(() => {
    const supaChannel = supabase
      .channel("sketches")
      .on("*", (payload) => {
        console.log("Received payload:", payload);

        const newDot = payload.new;
        console.log("newDot:", newDot);

        const newExternalDot = new ExternalDot(
          newDot.x,
          newDot.y,
          newDot.radius,
          newDot.color.red,
          newDot.color.green,
          newDot.color.blue,
          newDot.color.alpha
        );
        console.log("newExternalDot:", newExternalDot);
        setExternalDots((prevDots) => [...prevDots, newExternalDot]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(supaChannel);
    };
  }, []);

  useEffect(() => {
    console.log("externalDots", externalDots);
  }, [externalDots]);

  const Sketch = (s) => {
    let currentColors = colors;

    s.setup = () => {
      const canvas = s.createCanvas(s.windowWidth, s.windowHeight);
      canvas.parent("canvas-holder");
      s.noStroke();
      s.background(0);
    };

    s.windowResized = () => {
      s.resizeCanvas(s.windowWidth, s.windowHeight);
    };

    // Send a dot when drawn (adjust this to fit your drawing logic)
    s.draw = () => {
      if (colors !== currentColors) {
        // Check if colors have changed
        s.background(0); // Clear to black
        currentColors = colors; // Update
      }

      // Render received dots
      for (let dot of externalDots) {
        dot.draw(s);
      }
    };

    s.mousePressed = () => {
      // Calculate your dot parameters...
      let ranColor = colors[Math.floor(Math.random() * colors.length)];

      const dot = {
        x: s.mouseX,
        y: s.mouseY,
        radius: r, // assuming r is defined and holds the radius value
        color: {
          red: ranColor[0],
          green: ranColor[1],
          blue: ranColor[2],
          alpha: ranColor[3],
        },
      };

      const newExternalDot = new ExternalDot(
        dot.x,
        dot.y,
        dot.radius,
        dot.color.red,
        dot.color.green,
        dot.color.blue,
        dot.color.alpha
      );
      console.log("newMousePressedlDot:", newExternalDot);
      setExternalDots((prevDots) => [...prevDots, newExternalDot]);

      // Insert new dot into Supabase
      supabase
        .from("sketches")
        .insert([dot])
        .then(({ data, error }) => {
          if (error) {
            console.error("Error saving the dot:", error);
          }
        });
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
