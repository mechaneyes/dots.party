import dynamic from "next/dynamic";
const DotOne = dynamic(() => import("../components/dotOne"), { ssr: false });

export default function Home() {
  return (
    <div className="app">
      <DotOne />
    </div>
  )
}
