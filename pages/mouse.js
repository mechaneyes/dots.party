import dynamic from "next/dynamic";
const P5Mouse = dynamic(
  () => import("../components/p5Mouse"),
  { ssr: false }
);

// import ReactMouse from '../components/reactMouse'

const Mouse = () => {
  return (
    <>
      <P5Mouse />
    </>
  );
};

export default Mouse;
