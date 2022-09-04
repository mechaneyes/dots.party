import dynamic from "next/dynamic";

const DotOne = dynamic(() => import("../components/DotOne"), {
  ssr: false,
});

const Gyre = () => {
  return <DotOne colorway="colColdGarden" />;
};

export default Gyre;
