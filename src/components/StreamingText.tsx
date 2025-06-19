"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface CursorConfig {
  style?: "line" | "block" | "underscore";
  blink?: boolean;
  blinkSpeed?: number;
  color?: string;
  width?: string;
  height?: string;
}

interface StreamingTextProps {
  content: string;
  speed?: "slow" | "normal" | "fast" | "human" | number;
  cursor?: CursorConfig;
  onComplete?: () => void;
  onCharacter?: (char: string, index: number) => void;
  onWord?: (word: string, wordIndex: number) => void;
  onPause?: () => void;
  onResume?: () => void;
  pauseOnPunctuation?: number;
  className?: string;
  interactive?: boolean;
  autoStart?: boolean;
  preserveWhitespace?: boolean;
}

interface TextSegment {
  text: string;
  isMarkup: boolean;
  tagName?: string;
  attributes?: Record<string, string>;
  className?: string;
}

const StreamingText: React.FC<StreamingTextProps> = ({
  content,
  speed = "human",
  cursor = { style: "line", blink: true, blinkSpeed: 530 },
  onComplete,
  onCharacter,
  onWord,
  onPause,
  onResume,
  pauseOnPunctuation = 150,
  className = "",
  interactive = false,
  autoStart = true,
  preserveWhitespace = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [showCursor, setShowCursor] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastWordIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse content into segments with markup support
  const segments = useMemo(() => {
    const parseMarkup = (text: string): TextSegment[] => {
      const segments: TextSegment[] = [];
      const regex = /<(\w+)(?:\s+([^>]*))?>([^<]*)<\/\1>|([^<]+)/g;
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (match[1]) {
          // Markup segment
          const tagName = match[1];
          const attributesStr = match[2] || "";
          const innerText = match[3] || "";

          const attributes: Record<string, string> = {};
          if (attributesStr) {
            const attrRegex = /(\w+)=["']([^"']*)["']/g;
            let attrMatch;
            while ((attrMatch = attrRegex.exec(attributesStr)) !== null) {
              attributes[attrMatch[1]] = attrMatch[2];
            }
          }

          segments.push({
            text: innerText,
            isMarkup: true,
            tagName,
            attributes,
            className: attributes.class || attributes.className,
          });
        } else {
          // Plain text segment
          const plainText = match[4] || "";
          segments.push({
            text: plainText,
            isMarkup: false,
          });
        }
      }

      return segments;
    };

    return parseMarkup(content);
  }, [content]);

  // Get typing delay based on speed setting
  const getTypingDelay = useCallback(() => {
    if (typeof currentSpeed === "number") return currentSpeed;

    const baseDelays = {
      slow: 120,
      normal: 60,
      fast: 30,
      human: 45,
    };

    let delay = baseDelays[currentSpeed] || 60;

    // Add human-like variance for "human" mode
    if (currentSpeed === "human") {
      const variance = Math.random() * 40 - 20; // ±20ms variance
      delay += variance;

      // Longer pauses after certain characters
      const currentChar = getCurrentCharacter();
      if (currentChar && ".!?".includes(currentChar)) {
        delay += pauseOnPunctuation;
      } else if (currentChar === ",") {
        delay += pauseOnPunctuation * 0.3;
      } else if (currentChar === " ") {
        delay += Math.random() * 20; // Slight variance on spaces
      }
    }

    return Math.max(delay, 10); // Minimum 10ms delay
  }, [currentSpeed, pauseOnPunctuation, currentIndex]);

  // Get current character being typed
  const getCurrentCharacter = useCallback(() => {
    let charIndex = 0;
    for (const segment of segments) {
      if (charIndex + segment.text.length > currentIndex) {
        return segment.text[currentIndex - charIndex];
      }
      charIndex += segment.text.length;
    }
    return null;
  }, [segments, currentIndex]);

  // Get total character count
  const totalChars = useMemo(() => {
    return segments.reduce((total, segment) => total + segment.text.length, 0);
  }, [segments]);

  // Handle cursor blinking
  useEffect(() => {
    if (cursor.blink && !isComplete) {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, cursor.blinkSpeed || 530);

      return () => {
        if (cursorIntervalRef.current) {
          clearInterval(cursorIntervalRef.current);
        }
      };
    } else {
      setShowCursor(true);
    }
  }, [cursor.blink, cursor.blinkSpeed, isComplete]);

  // Main typing effect
  useEffect(() => {
    if (!isPlaying || isComplete) return;

    if (currentIndex >= totalChars) {
      setIsComplete(true);
      setShowCursor(false);
      onComplete?.();
      return;
    }

    intervalRef.current = setTimeout(() => {
      const char = getCurrentCharacter();

      setCurrentIndex((prev) => {
        const newIndex = prev + 1;

        // Character callback
        if (char) {
          onCharacter?.(char, newIndex - 1);
        }

        // Word completion callback
        if (char === " " || newIndex === totalChars) {
          const currentWordIndex = Math.floor(newIndex / 5); // Approximate word count
          if (currentWordIndex > lastWordIndexRef.current) {
            onWord?.("", currentWordIndex);
            lastWordIndexRef.current = currentWordIndex;
          }
        }

        return newIndex;
      });
    }, getTypingDelay());

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [
    isPlaying,
    currentIndex,
    totalChars,
    isComplete,
    getTypingDelay,
    getCurrentCharacter,
    onCharacter,
    onWord,
    onComplete,
  ]);

  // Render the text with proper markup
  const renderText = () => {
    let charIndex = 0;
    const result: React.ReactNode[] = [];

    for (let segIndex = 0; segIndex < segments.length; segIndex++) {
      const segment = segments[segIndex];
      const segmentEndIndex = charIndex + segment.text.length;
      const visibleLength = Math.max(
        0,
        Math.min(segment.text.length, currentIndex - charIndex)
      );
      const visibleText = segment.text.substring(0, visibleLength);

      if (visibleText) {
        if (segment.isMarkup) {
          const Tag = segment.tagName as keyof React.JSX.IntrinsicElements;
          const props: any = {};

          if (segment.className) {
            props.className = segment.className;
          }

          // Add other attributes
          Object.entries(segment.attributes || {}).forEach(([key, value]) => {
            if (key !== "class" && key !== "className") {
              props[key] = value;
            }
          });

          result.push(
            React.createElement(
              Tag,
              { key: `segment-${segIndex}`, ...props },
              preserveWhitespace ? visibleText : visibleText.trim()
            )
          );
        } else {
          result.push(
            <span key={`segment-${segIndex}`}>
              {preserveWhitespace ? visibleText : visibleText.trim()}
            </span>
          );
        }
      }

      charIndex = segmentEndIndex;
    }

    return result;
  };

  // Interactive controls
  const pause = useCallback(() => {
    setIsPlaying(false);
    onPause?.();
  }, [onPause]);

  const resume = useCallback(() => {
    setIsPlaying(true);
    onResume?.();
  }, [onResume]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  }, [isPlaying, pause, resume]);

  const skipToEnd = useCallback(() => {
    setCurrentIndex(totalChars);
    setIsComplete(true);
    setIsPlaying(false);
    setShowCursor(false);
    onComplete?.();
  }, [totalChars, onComplete]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setIsComplete(false);
    setIsPlaying(true);
    setShowCursor(true);
    lastWordIndexRef.current = 0;
  }, []);

  const increaseSpeed = useCallback(() => {
    setCurrentSpeed((prev) => {
      if (typeof prev === "number") return Math.max(10, prev - 10);
      const speeds: Array<"slow" | "normal" | "fast" | "human"> = [
        "slow",
        "normal",
        "fast",
        "human",
      ];
      const currentIdx = speeds.indexOf(
        prev as "slow" | "normal" | "fast" | "human"
      );
      return speeds[Math.max(0, currentIdx - 1)] || prev;
    });
  }, []);

  const decreaseSpeed = useCallback(() => {
    setCurrentSpeed((prev) => {
      if (typeof prev === "number") return prev + 10;
      const speeds: Array<"slow" | "normal" | "fast" | "human"> = [
        "slow",
        "normal",
        "fast",
        "human",
      ];
      const currentIdx = speeds.indexOf(
        prev as "slow" | "normal" | "fast" | "human"
      );
      return speeds[Math.min(speeds.length - 1, currentIdx + 1)] || prev;
    });
  }, []);

  // Cursor styles
  const getCursorStyle = () => {
    const baseStyle = {
      display: "inline-block",
      backgroundColor: cursor.color || "currentColor",
      marginLeft: "1px",
    };

    switch (cursor.style) {
      case "block":
        return {
          ...baseStyle,
          width: cursor.width || "0.6em",
          height: cursor.height || "1em",
        };
      case "underscore":
        return {
          ...baseStyle,
          width: cursor.width || "0.6em",
          height: cursor.height || "2px",
          marginTop: "0.8em",
        };
      case "line":
      default:
        return {
          ...baseStyle,
          width: cursor.width || "2px",
          height: cursor.height || "1em",
        };
    }
  };

  // Keyboard controls using react-hotkeys-hook
  useHotkeys(
    "space",
    (e) => {
      e.preventDefault();
      togglePlayPause();
    },
    {
      enabled: interactive,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    }
  );

  useHotkeys(
    "right",
    (e) => {
      e.preventDefault();
      skipToEnd();
    },
    {
      enabled: interactive,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    }
  );

  useHotkeys(
    "left",
    (e) => {
      e.preventDefault();
      restart();
    },
    {
      enabled: interactive,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    }
  );

  useHotkeys(
    "up",
    (e) => {
      e.preventDefault();
      increaseSpeed();
    },
    {
      enabled: interactive,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    }
  );

  useHotkeys(
    "down",
    (e) => {
      e.preventDefault();
      decreaseSpeed();
    },
    {
      enabled: interactive,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    }
  );

  return (
    <div
      ref={containerRef}
      className={`inline-block font-mono text-base md:text-md ${className}`}
      tabIndex={interactive ? 0 : undefined}
      style={{ outline: "none" }}
    >
      <span className="inline-block">
        {renderText()}
        <AnimatePresence>
          {!isComplete && showCursor && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={getCursorStyle()}
              className="animate-pulse"
            />
          )}
        </AnimatePresence>
      </span>

      {interactive && (
        <div className="mt-2 text-xs text-gray-500 opacity-50">
          Space: pause/resume | →: skip | ←: restart | ↑↓: speed
        </div>
      )}
    </div>
  );
};

export default StreamingText;
