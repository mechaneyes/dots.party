import dynamic from "next/dynamic";
import { Suspense } from "react";

const dotOne = dynamic(() => import("../components/dotOne"), {
  suspense: true,
  ssr: false,
});

const Dots = () => {
  return (
    <Suspense fallback={`Loading...`}>
      <dotOne />
    </Suspense>
  );
};

export default Dots;
