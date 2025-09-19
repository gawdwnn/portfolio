"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  pauseOnPunctuation?: number;
  className?: string;
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
  cursor = { style: "line", blink: true, blinkSpeed: 500 },
  onComplete,
  pauseOnPunctuation = 150,
  className = "",
  autoStart = true,
  preserveWhitespace = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Memoize character mapping for better performance
  const characterMap = useMemo(() => {
    const map = new Map<number, string>();
    let charIndex = 0;
    for (const segment of segments) {
      for (let i = 0; i < segment.text.length; i++) {
        map.set(charIndex + i, segment.text[i]);
      }
      charIndex += segment.text.length;
    }
    return map;
  }, [segments]);

  // Get current character being typed
  const getCurrentCharacter = useCallback(() => {
    return characterMap.get(currentIndex) || null;
  }, [characterMap, currentIndex]);

  // Get typing delay based on speed setting
  const getTypingDelay = useCallback(() => {
    if (typeof speed === "number") return speed;

    const baseDelays = {
      slow: 120,
      normal: 60,
      fast: 30,
      human: 35,
    };

    let delay = baseDelays[speed] || 60;

    // Add human-like variance for "human" mode
    if (speed === "human") {
      const variance = Math.random() * 20 - 10;
      delay += variance;

      // Longer pauses after certain characters
      const currentChar = getCurrentCharacter();
      if (currentChar && ".!?".includes(currentChar)) {
        delay += pauseOnPunctuation;
      } else if (currentChar === ",") {
        delay += pauseOnPunctuation * 0.3;
      } else if (currentChar === " ") {
        delay += Math.random() * 10;
      }
    }

    return Math.max(delay, 15);
  }, [speed, pauseOnPunctuation, getCurrentCharacter]);

  // Get total character count
  const totalChars = useMemo(() => {
    return segments.reduce((total, segment) => total + segment.text.length, 0);
  }, [segments]);

  // Handle cursor blinking with optimized timing
  useEffect(() => {
    if (cursor.blink && !isComplete) {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, cursor.blinkSpeed || 500); // Slightly faster for smoother blink

      return () => {
        if (cursorIntervalRef.current) {
          clearInterval(cursorIntervalRef.current);
        }
      };
    } else {
      setShowCursor(true);
    }
  }, [cursor.blink, cursor.blinkSpeed, isComplete]);

  // Main typing effect with optimized dependencies
  useEffect(() => {
    if (!isPlaying || isComplete) return;

    if (currentIndex >= totalChars) {
      setIsComplete(true);
      setShowCursor(false);
      onComplete?.();
      return;
    }

    const char = getCurrentCharacter();
    const delay = getTypingDelay();

    intervalRef.current = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentIndex, totalChars, isComplete]);

  // Render the text with proper markup - memoized for performance
  const renderText = useMemo(() => {
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
  }, [segments, currentIndex, preserveWhitespace]);


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


  return (
    <div className={`inline-block ${className}`}>
      <span className="inline-block">
        {renderText}
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
    </div>
  );
};

export default StreamingText;
