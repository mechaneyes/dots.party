import { useState } from "react";

const ToggleFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = () => {
    const elem = document.querySelector(".app");
    if (elem.requestFullscreen) {
      elem.requestFullscreen({ navigationUI: "show" });
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    }
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
  };

  return (
    <>
      <p
        className={
          isFullscreen
            ? "toggle-full toggle-full--full"
            : "toggle-full toggle-full--not-full"
        }
        onClick={toggleFullscreen}
      >
        {isFullscreen ? "exit fullscreen" : "enter fullscreen"}
      </p>
    </>
  );
};

export default ToggleFullscreen;
