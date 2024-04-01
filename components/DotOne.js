import { useEffect, useState } from "react";
import p5 from "p5";
import supabase from "./supabaseClient";

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

  let r = 20;
  let externalDots = [];

  // ————————————————————————————————————o————————————————————————————————————o classes -->
  // ————————————————————————————————————o dots classes —>
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

  // ————————————————————————————————————o recieved dot class —>
  //
  const ExternalDot = class {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.r = radius;
      this.color = color;
    }

    // method to render the dot with p5 passing in the p5 instance 's'
    draw(s) {
      s.noStroke();
      s.fill(
        this.color.red,
        this.color.green,
        this.color.blue,
        this.color.alpha
      );
      s.circle(this.x, this.y, this.r);
    }
  };

  // ————————————————————————————————————o————————————————————————————————————o supabase realtime -->
  // ————————————————————————————————————o supabase realtime —>
  //
  const handleInserts = (payload) => {
    console.log("payload", payload.new);
    const newExternalDot = new ExternalDot(
      payload.new.x,
      payload.new.y,
      payload.new.radius,
      payload.new.color
    );
    externalDots.push(newExternalDot);
  };

  // Supabase init
  useEffect(() => {
    supabase
      .channel("supaChannel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sketches" },
        handleInserts
      )
      .subscribe();

      return () => {
        supabase.removeChannel(channel)
      }
  }, []);

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

  const Sketch = (s) => {
    let currentColors = colors;

    s.setup = () => {
      const canvas = s.createCanvas(window.innerWidth, window.innerWidth);
      canvas.parent("canvas-holder");
      s.noStroke();
      s.background(0);
    };

    // ————————————————————————————————————o draw —>
    //
    s.draw = () => {
      // Check if colors have changed and update
      if (colors !== currentColors) {
        s.background(0); // Clear to black
        currentColors = colors; // Update
      }

      if (s.mouseIsPressed === true) {
        // Create a new 'Dot' object when the mouse is pressed.
        // Grow the radius on each draw tick
        r += 2;
        new Dot(s, r);

        let ranColor = colors[Math.floor(Math.random() * colors.length)];
        const dot = {
          x: s.mouseX,
          y: s.mouseY,
          radius: r,
          color: {
            red: ranColor[0],
            green: ranColor[1],
            blue: ranColor[2],
            alpha: ranColor[3],
          },
        };

        // ————————————————————————————————————o draw —>
        //
        // Insert new dot into Supabase
        supabase
          .from("sketches")
          .insert([dot])
          .then(({ data, error }) => {
            if (error) {
              console.error("Error saving the dot:", error);
            }
          });
      }

      // Render received dots
      externalDots.forEach((dot) => dot.draw(s));
    };
    
    // ————————————————————————————————————o radius resetting —>
    //
    // reset radius back to 10 when mouse is released
    s.mouseReleased = () => {
      r = 10;
    };

    // reset radius back to 10 when touch is released
    s.touchEnded = () => {
      r = 10;
    };
    
    // ————————————————————————————————————o canvas resizing —>
    //
    // resize canvas when window is resized to fill screen
    // 
    s.windowResized = () => {
      s.resizeCanvas(window.innerWidth, window.innerWidth);
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
