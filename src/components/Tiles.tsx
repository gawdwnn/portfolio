"use client";

import { cn } from "@/lib/utils";

interface TilesProps {
  className?: string;
}

export function Tiles({ className }: TilesProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.4]",
        className
      )}
    />
  );
}
