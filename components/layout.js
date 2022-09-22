// components/layout.js
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Splash from "./Splash";

const Layout = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  let splashScreen = showSplash ? <Splash /> : null;
  let splashHide;

  useEffect(() => {
    splashHide = () => {
      setShowSplash(false);
    };
  }, [showSplash]);

  return (
    <>
      {/* <Navbar /> */}
      <main onMouseDown={() => splashHide()} onTouchMove={() => splashHide()}>
        {splashScreen}
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
