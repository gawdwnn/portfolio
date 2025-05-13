import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
  constrainWidth?: boolean;
}

export default function AnimatedTextCycle({
  words,
  interval = 4000,
  className = "",
  constrainWidth = false,
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update width when window resizes
  useEffect(() => {
    const handleResize = () => {
      updateWidth(currentIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  // Get the width of the current word
  const updateWidth = (index: number) => {
    // Skip width calculation if we're using parent container width constraints
    if (constrainWidth) {
      setWidth("100%");
      return;
    }

    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > index) {
        // Get parent width to ensure we don't exceed it
        const parentWidth =
          containerRef.current?.parentElement?.getBoundingClientRect().width ||
          0;
        let measuredWidth = elements[index].getBoundingClientRect().width;

        // Cap the width to parent container width
        if (parentWidth > 0 && measuredWidth > parentWidth) {
          measuredWidth = parentWidth;
        }

        setWidth(`${measuredWidth}px`);
      }
    }
  };

  // Use useLayoutEffect to calculate width before browser paint
  useLayoutEffect(() => {
    // Wait a tiny bit for the DOM to fully settle
    const timer = setTimeout(() => {
      updateWidth(currentIndex);
    }, 50);

    return () => clearTimeout(timer);
  }, [currentIndex, constrainWidth]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  const containerVariants = {
    hidden: {
      y: -10,
      opacity: 0,
      filter: "blur(4px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      y: 10,
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  // Determine styling for text items
  const textStyle = constrainWidth
    ? { whiteSpace: "normal", width: "100%" }
    : { whiteSpace: "nowrap" };

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      {/* Hidden measurement div with all words rendered */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden", maxWidth: "100%" }}
      >
        {words.map((word, i) => (
          <span key={i} className={className} style={textStyle}>
            {word}
          </span>
        ))}
      </div>

      {/* Visible animated word */}
      <motion.span
        className="relative inline-block"
        style={{ maxWidth: "100%", display: "block" }}
        animate={{
          width,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
          },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={textStyle}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
}
