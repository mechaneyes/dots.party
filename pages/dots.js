import dynamic from "next/dynamic";
const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });
// const MousePos = dynamic(() =>
//   import("../components/DotOne").then((mod) => mod.mousePos, {
//     ssr: false,
//   })
// );

const Dots = () => {
  // ————————————————————————————————————o————————————————————————————————————o socket.io -->
  // ————————————————————————————————————o socket.io —>
  //
  return (
    <>
      <DotOne />
    </>
  );
};

export default Dots;
