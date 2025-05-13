"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useSpotlightEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const requestRef = useRef<number | null>(null);

  // Create a throttled mouse move handler
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const currentTime = performance.now();

    // Only schedule update if we don't have a pending frame
    if (requestRef.current === null) {
      requestRef.current = requestAnimationFrame(() => {
        // Throttle to max 25 updates per second (40ms between updates)
        if (currentTime - lastUpdateTime.current > 40) {
          setMousePosition({ x: event.clientX, y: event.clientY });
          lastUpdateTime.current = currentTime;
        }
        requestRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // Cancel any pending animation frame on unmount
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleMouseMove]);

  return mousePosition;
}
