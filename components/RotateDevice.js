const RotateDevice = () => {
  if (typeof window !== "undefined") {
    window.addEventListener("resize", function () {
      const rotateDeviceElement = document.querySelector(".rotate-device");

      if (window.innerHeight > window.innerWidth) {
        // Screen orientation is vertical
        rotateDeviceElement.style.display = "flex";
      } else {
        // Screen orientation is horizontal
        rotateDeviceElement.style.display = "none";
      }
    });

    // Call the event handler once to set the initial state
    window.dispatchEvent(new Event("resize"));
  }
  
  return (
    <>
      <p className="rotate-device">rotate your device</p>
    </>
  );
};

export default RotateDevice;
