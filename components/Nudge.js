import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { splasherAtom, nudgerAtom } from "../store";

const Nudge = () => {
  const splasher = useAtomValue(splasherAtom);
  const [nudger, setNudger] = useAtom(nudgerAtom);

  useEffect(() => {
    const nudgeElement = document.querySelector(".nudge");

    if (!splasher) {
      setTimeout(() => {
        setNudger(true);
      }, 1800);

      setTimeout(() => {
        setNudger(false);
      }, 2400);
    }

    // strip from DOM only after both transitions have ended
    let transitionCount = 0;

    // Listen for the transition to end
    nudgeElement.addEventListener("transitionend", function () {
      transitionCount++;

      if (transitionCount === 2) {
        // Remove the element from the DOM
        if (nudgeElement && nudgeElement.parentNode) {
          nudgeElement.parentNode.removeChild(nudgeElement);
        }
      }
    });
  }, [splasher]);

  return (
    <>
      <div
        className={`${
          nudger && !splasher ? "nudge" : "nudge nudge--not-visible"
        }`}
      >
        <div className="nudge_inner">
          <button className="enter">
            keep
            <br />
            tapping
          </button>
        </div>
      </div>
    </>
  );
};

export default Nudge;
