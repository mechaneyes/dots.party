import dynamic from "next/dynamic";
const dotOne = dynamic(() => import("../components/dotOne"), { ssr: false });

const Dots = () => {
  return (
    <>
      <dotOne />
    </>
  );
};

export default Dots;
