import React, { useEffect, useState, useCallback } from "react";
import { Fade } from "@mui/material";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";

/**
 * Scroll to top button component with Tailwind CSS styling
 * @metadata
 * @timestamp 2025-03-20 16:42:45
 * @user vdabral
 */
function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 500);
  }, []);

  // Smooth scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Add scroll listener with throttling
  useEffect(() => {
    let throttleTimer;

    const throttledScroll = () => {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          handleScroll();
          throttleTimer = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledScroll);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [handleScroll]);

  return (
    <Fade in={isVisible}>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className={`
          fixed
          bottom-8
          right-8
          z-50
          flex
          items-center
          justify-center
          w-12
          h-12
          bg-blue-600/90
          hover:bg-blue-700
          active:bg-blue-800
          text-white
          rounded-full
          shadow-lg
          hover:shadow-xl
          cursor-pointer
          transition-all
          duration-300
          ease-in-out
          transform
          hover:-translate-y-1
          active:translate-y-0
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          focus:ring-offset-2
          backdrop-blur-sm
          sm:bottom-6
          sm:right-6
          sm:w-10
          sm:h-10
          ${!isVisible && "pointer-events-none"}
        `}
      >
        <ExpandLessRoundedIcon
          className={`
            w-6 
            h-6 
            transition-transform 
            duration-300 
            group-hover:scale-110
          `}
        />
      </button>
    </Fade>
  );
}

export default TopButton;
