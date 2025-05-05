"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const TypewriterText = ({
  text,
  speed = 40,
  className = "",
  onComplete,
}: {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      // Call onComplete slightly after the last character is added
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, speed);
      return () => clearTimeout(completeTimeout);
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className={cn("font-mono", className)}>
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </div>
  );
};

export default TypewriterText;
