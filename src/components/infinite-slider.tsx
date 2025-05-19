"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface InfiniteSliderProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  gap?: number;
}

export function InfiniteSlider({
  children,
  className,
  duration = 20,
  gap = 48,
}: InfiniteSliderProps) {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        className="flex"
        animate={{
          x: [0, -width],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        <div className="flex" style={{ gap }}>
          {children}
        </div>
        <div className="flex" style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
