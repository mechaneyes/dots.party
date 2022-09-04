import dynamic from "next/dynamic";

const DotOne = dynamic(() => import("../components/DotOne"), {
  ssr: false,
});

const Spot = () => {
  return <DotOne colorway="colStadiumCar" />;
};

export default Spot;
