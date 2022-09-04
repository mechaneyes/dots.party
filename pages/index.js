import dynamic from "next/dynamic";
const DotOne = dynamic(() => import("../components/DotOne"), { ssr: false });

export default function Home() {
  return (
    <div className="app">
      return <DotOne colorway="colStadiumCar" />;
    </div>
  )
}
