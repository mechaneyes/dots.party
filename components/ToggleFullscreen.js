import { useEffect } from "react";

const ToggleFullscreen = () => {
  const openFullscreen = () => {
    const elem = document.querySelector(".app");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    }
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    }
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
      <p className="toggle-full" onClick={toggleFullscreen}>
        fullscreen
      </p>
    </>
  );
};

export default ToggleFullscreen;
