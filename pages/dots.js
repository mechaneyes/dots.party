import dynamic from "next/dynamic";
const DotOne = dynamic(() => import("../components/dotOne"), { ssr: false });

const Dots = () => {
  return (
    <>
      <DotOne />
    </>
  );
};

export default Dots;
