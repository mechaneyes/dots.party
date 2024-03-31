const RotateDevice = () => {
  window.addEventListener("resize", function () {
    const rotateDeviceElement = document.querySelector(".rotate-device");

    if (window.innerHeight > window.innerWidth) {
      // Screen orientation is vertical
      rotateDeviceElement.style.display = "block";
    } else {
      // Screen orientation is horizontal
      rotateDeviceElement.style.display = "none";
    }
  });

  // Call the event handler once to set the initial state
  window.dispatchEvent(new Event("resize"));
  return (
    <>
      <p className="rotate-device">rotate</p>
    </>
  );
};

export default RotateDevice;
