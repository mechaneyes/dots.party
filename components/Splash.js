import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { splasherAtom } from "../store";

const Splash = () => {
  const [splasher, setSplasher] = useAtom(splasherAtom);

  useEffect(() => {
    const splashElement = document.querySelector(".splash");

    const handleClick = () => {
      console.log("splash clicked");
      setSplasher(false);
    };

    splashElement.addEventListener("click", handleClick);

    // Listen for the transition to end
    splashElement.addEventListener("transitionend", function () {
      // Remove the element from the DOM
      splashElement.parentNode.removeChild(splashElement);
    });

    // Cleanup function
    return () => {
      splashElement.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div className={`${splasher ? "splash" : "splash splash--not-visible"}`}>
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
