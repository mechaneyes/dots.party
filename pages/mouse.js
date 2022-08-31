import dynamic from "next/dynamic";
const ReactMouse = dynamic(
  () => import("../components/reactMouse"),
  { ssr: false }
);

// import ReactMouse from '../components/reactMouse'

const Mouse = () => {
  return (
    <>
      <ReactMouse />
    </>
  );
};

export default Mouse;
