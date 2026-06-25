import { useEffect, useState } from "react";

export default function useResponsive() {
  const [screenWidth, setScreenWidth] =
    useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  return {
    screenWidth,
    isDesktop: screenWidth > 1024,
    isTablet:
      screenWidth <= 1024 &&
      screenWidth > 768,
    isMobile: screenWidth <= 768,
  };
}