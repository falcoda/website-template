import React from "react";

import { breakpoints } from "../../config/Breakpoints";
import useWindowWidth from "../../hooks/useWindowWidth";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";

const Navbar: React.FC = () => {
  const { windowWidth } = useWindowWidth();

  return (
    <div>
      {windowWidth > breakpoints["breakpoint-lg-4"] ? (
        <DesktopNavbar />
      ) : (
        <MobileNavbar />
      )}
    </div>
  );
};

export default React.memo(Navbar);
