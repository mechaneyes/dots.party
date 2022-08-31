import { useRef, useEffect } from "react";
import p5 from "p5";

const p5Mouse = () => {
  const pFiveRef = useRef();
  
  let mousePos = (theMousePos) => {
    console.log("s.mouseX", theMousePos);
    return theMousePos;
  };

  useEffect(() => {
    const Sketch = (s) => {
      let cnv

      s.setup = () => {
        cnv = s.createCanvas(window.innerWidth, 200);
        cnv.mouseMoved(mousePos);
        s.noStroke();
        s.rectMode(s.CENTER);
      };

      s.draw = () => {
        s.background(230);
        let r1 = s.map(s.mouseX, 0, s.width, 0, s.height);
        let r2 = s.height - r1;

        s.fill(237, 34, 93, r1);
        s.rect(s.width / 2 + r1 / 2, s.height / 2, r1, r1);

        s.fill(237, 34, 93, r2);
        s.rect(s.width / 2 - r2 / 2, s.height / 2, r2, r2);

        mousePos(s.mouseX);
      };
    };

    const thisP5 = new p5(Sketch, pFiveRef.current);
  }, []);

  return <div ref={pFiveRef} />;
};

export default p5Mouse;
