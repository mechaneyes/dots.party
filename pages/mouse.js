import dynamic from "next/dynamic";
const P5Mouse = dynamic(() => import("../components/p5Mouse"), { ssr: false });
// const MousePos = dynamic(() =>
//   import("../components/p5Mouse").then((mod) => mod.mousePos, {
//     ssr: false,
//   })
// );

const Mouse = () => {
  // ————————————————————————————————————o————————————————————————————————————o socket.io -->
  // ————————————————————————————————————o socket.io —>
  //
  return (
    <>
      <P5Mouse />
    </>
  );
};

export default Mouse;
