"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TilesProps {
  className?: string;
  rows?: number;
  cols?: number;
  tileClassName?: string;
  tileSize?: "sm" | "md" | "lg";
}

const tileSizes = {
  sm: "w-8 h-8",
  md: "w-9 h-9 md:w-12 md:h-12",
  lg: "w-12 h-12 md:w-16 md:h-16",
};

export function Tiles({
  className,
  rows = 100,
  cols = 10,
  tileClassName,
  tileSize = "md",
}: TilesProps) {
  const rowsArray = new Array(rows).fill(1);
  const colsArray = new Array(cols).fill(1);

  return (
    <div
      className={cn("relative z-0 w-full h-full overflow-hidden", className)}
    >
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {rowsArray.map((_, i) =>
          colsArray.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `rgba(59, 130, 246, 0.3)`,
                borderColor: `rgba(59, 130, 246, 0.7)`,
                scale: 1.05,
                zIndex: 10,
                boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                transition: { duration: 0.2 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`tile-${i}-${j}`}
              className={cn(
                "border-r border-t border-opacity-30 border-blue-600/20 relative transition-colors duration-300",
                tileClassName
              )}
            />
          ))
        )}
      </div>
    </div>
  );
}
