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

  useEffect(() => {
    const handleResize = () => {
      updateWidth(currentIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  const updateWidth = (index: number) => {
    if (constrainWidth) {
      setWidth("100%");
      return;
    }

    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > index) {
        const parentWidth =
          containerRef.current?.parentElement?.getBoundingClientRect().width ||
          0;
        let measuredWidth = elements[index].getBoundingClientRect().width;

        if (parentWidth > 0 && measuredWidth > parentWidth) {
          measuredWidth = parentWidth;
        }

        setWidth(`${measuredWidth}px`);
      }
    }
  };

  useLayoutEffect(() => {
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

  const textStyle = constrainWidth
    ? { whiteSpace: "normal", width: "100%" }
    : { whiteSpace: "nowrap" };

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
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
