"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SpotlightOptions {
  disableOnMobile?: boolean;
  throttleMs?: number;
}

export function useSpotlightEffect(options: SpotlightOptions = {}) {
  const { disableOnMobile = false, throttleMs = 40 } = options;

  // Initialize to center of screen
  const [mousePosition, setMousePosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  const lastUpdateTime = useRef(0);
  const requestRef = useRef<number | null>(null);
  const isTouchDevice = useRef(false);

  // Create a throttled pointer move handler for both mouse and touch
  const handlePointerMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const currentTime = performance.now();

      // Only schedule update if we don't have a pending frame
      if (requestRef.current === null) {
        requestRef.current = requestAnimationFrame(() => {
          // Throttle updates
          if (currentTime - lastUpdateTime.current > throttleMs) {
            let clientX, clientY;

            // Handle both mouse and touch events
            if ("touches" in event) {
              // It's a touch event
              clientX = event.touches[0].clientX;
              clientY = event.touches[0].clientY;
              isTouchDevice.current = true;
            } else {
              // It's a mouse event
              clientX = event.clientX;
              clientY = event.clientY;
            }

            // Only update if we're not a touch device or if we allow on mobile
            if (!isTouchDevice.current || !disableOnMobile) {
              setMousePosition({ x: clientX, y: clientY });
            }

            lastUpdateTime.current = currentTime;
          }
          requestRef.current = null;
        });
      }
    },
    [throttleMs, disableOnMobile]
  );

  // Handle window resize - update center position
  const handleResize = useCallback(() => {
    // Only reset to center for touch devices
    if (isTouchDevice.current) {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }
  }, []);

  useEffect(() => {
    // Detect if touch device on mount
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Set initial position to center
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    // Add event listeners with passive option for better performance
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      // Cancel any pending animation frame on unmount
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handlePointerMove, handleResize]);

  return mousePosition;
}
