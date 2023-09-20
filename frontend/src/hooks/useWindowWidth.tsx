import { useEffect, useState } from "react";

import { breakpoints } from "../config/Breakpoints";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const isMobile = windowWidth <= breakpoints["breakpoint-md-4"];
  const isTabelet = windowWidth <= breakpoints["breakpoint-md-2"];

  return { windowWidth, isMobile, isTabelet };
};

export default useWindowWidth;
