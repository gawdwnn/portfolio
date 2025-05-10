"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";

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
  rows = 30,
  cols = 30,
  tileClassName,
  tileSize = "md",
}: TilesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderTiles = () => {
    const tiles = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        tiles.push(
          <div
            key={`tile-${i}-${j}`}
            className={cn(
              "border-r border-t border-opacity-10 relative",
              "border-neutral-800",
              "bg-neutral-900/10",
              tileClassName
            )}
          />
        );
      }
    }
    return tiles;
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative z-0 w-full h-full overflow-hidden", className)}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {renderTiles()}
    </div>
  );
}
