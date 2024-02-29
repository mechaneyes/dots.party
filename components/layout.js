// components/layout.js
import { useEffect, useState } from "react";
import { useAtom } from 'jotai'

import Navbar from "./navbar";
import Footer from "./footer";
import Splash from "./Splash";
import {qrAtom} from '../abstracts/jotaiAtoms'

const Layout = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [qr] = useAtom(qrAtom)

  let splashScreen = showSplash ? <Splash /> : null;
  let splashHide;

  useEffect(() => {
    splashHide = () => {
      setShowSplash(false);
    };
    if (qr) {
      setShowSplash(false);
    }
    console.log('qr', qr)
  }, [showSplash, qr]);

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
