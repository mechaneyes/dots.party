const RotateDevice = () => {
  if (typeof window !== "undefined") {
    window.addEventListener("resize", function () {
      const rotateDeviceDiv = document.querySelector(".rotate");

      if (window.innerHeight > window.innerWidth) {
        // Screen orientation is vertical
        rotateDeviceDiv.style.display = "flex";
      } else {
        // Screen orientation is horizontal
        rotateDeviceDiv.style.display = "none";
      }
    });

    // Call the event handler once to set the initial state
    window.dispatchEvent(new Event("resize"));
  }

  return (
    <>
      <div className="rotate">
        <p className="rotate__copy">rotate your device</p>
        <img className="rotate__image" src="/images/rotate.gif" alt="rotate device" />
      </div>
    </>
  );
};

export default RotateDevice;
