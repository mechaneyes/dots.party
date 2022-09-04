import dynamic from "next/dynamic";

const DotOne = dynamic(() => import("../components/DotOne"), {
  ssr: false,
});

const Particle = () => {
  return <DotOne colorway="colUtopia" />;
};

export default Particle;
