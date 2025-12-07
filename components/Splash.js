import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { splasherAtom } from "../store";

const Splash = () => {
  const [splasher, setSplasher] = useAtom(splasherAtom);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      if (splasher && !fadeOut) {
        setFadeOut(true);
        setTimeout(() => {
          setSplasher(false);
        }, 500);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [splasher, fadeOut, setSplasher]);

  if (!splasher && fadeOut) {
    return null;
  }

  return (
    <>
      <div className={`splash ${fadeOut ? "splash--fading-out" : ""}`}>
        <div className="splash_inner">
          <div className="dot dot--top-left"></div>
          <div className="dot dot--top-right"></div>

          <button className="enter">tap + tap some more</button>
          <div className="dot dot--bottom-left"></div>
        </div>
      </div>
    </>
  );
};

export default Splash;
