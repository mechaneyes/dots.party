import dynamic from "next/dynamic";
const RectOne = dynamic(() => import("../components/rectOne"), { ssr: false });
// const MousePos = dynamic(() =>
//   import("../components/RectOne").then((mod) => mod.mousePos, {
//     ssr: false,
//   })
// );

const Rectangle = () => {
  // ————————————————————————————————————o————————————————————————————————————o socket.io -->
  // ————————————————————————————————————o socket.io —>
  //
  return (
    <>
      <RectOne />
    </>
  );
};

export default Rectangle;
