"use client";

import { motion } from "framer-motion";
import { Code, Github, Globe, Mail, Terminal, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import { HoverBorderGradient } from "./HoverBorderGradient";
import InteractiveTerminal from "./InteractiveTerminal";
import TypewriterText from "./TypewriterText";

/**
 * About Component with Interactive Terminal
 *
 * Behavior:
 * 1. Lazy Initialization:
 *    - Terminal animation only starts when section scrolls into view
 *    - Uses Intersection Observer (from usehooks-ts) to detect visibility
 *    - Prevents unwanted scrolling during Hero section animations
 *
 * 2. Timed & Sequential Content Progression:
 *    - Content appears progressively in stages
 *    - Initial stages use timers, later stages trigger on animation completion
 *    - First shows initialization message
 *    - Then displays personal info with icons
 *    - Followed by a detailed introduction paragraph (typewriter effect)
 *    - Finally activates interactive mode *after* the bio finishes typing
 *
 * 3. Command-Prompt Interface:
 *    - After the staged introduction, shows an interactive command prompt
 *    - Users can type commands (help, skills, experience, education, contact, clear)
 *    - Responses appear directly in the terminal below the command
 *    - Command history is preserved and displayed
 *    - Supports keyboard input with auto-focus
 *    - No UI menu buttons - interaction is entirely text-based
 *
 * State Control:
 * - terminalStage: Controls timed content progression (0-4)
 * - showPrompt: Toggles visibility of the command input prompt
 * - animationStarted: Flag to ensure animation only starts once
 * - useIntersectionObserver: Handles section visibility detection
 */

// Define props for About component
interface AboutProps {
  id?: string;
}

export default function About({ id }: AboutProps) {
  // Reference to the section element for intersection observer
  const sectionRef = useRef<HTMLElement>(null);

  // Use the hook to detect intersection - this returns a ref to attach
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.25,
    freezeOnceVisible: true,
  });

  // Terminal state
  const [terminalStage, setTerminalStage] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Predefined responses for the demo
  const availableCommands = {
    help: "Available commands: skills, experience, education, contact, clear",
    skills:
      "TypeScript, React, Next.js, Node.js, Python, AWS, Docker, CI/CD, GraphQL",
    experience:
      "• 5 years of Software Engineering\n• Led feature development in agile teams\n• Built scalable solutions for B2B and B2C startups",
    education:
      "• Software Development, Conestoga College, Waterloo\n• Continuing education in AI and Machine Learning",
    contact: "Email: gawdwnn@gmail.com\nGitHub: github.com/gawdwnn",
    clear: "CLEAR_COMMAND",
  };

  // Start animation sequence when section becomes visible (using the hook's value)
  useEffect(() => {
    // Only start animation once when section becomes visible
    if (isIntersecting && !animationStarted) {
      // Use isIntersecting from the hook
      setAnimationStarted(true);
      setTerminalStage(1); // Start from stage 1
    }
  }, [isIntersecting, animationStarted]); // Depend on the hook's value

  // Progress through initial terminal stages using timers
  useEffect(() => {
    // Don't proceed if section not visible or animation not started
    if (!animationStarted) return;

    // Only handle timer-based transitions (up to stage 3)
    if (terminalStage > 0 && terminalStage < 3) {
      const timer = setTimeout(
        () => {
          setTerminalStage((prev) => prev + 1);
        },
        1500 // Use a consistent delay for stages 1->2 and 2->3
      );
      return () => clearTimeout(timer);
    }
    // Stage 3 -> 4 is handled by the bio Typewriter's onComplete
    // Stage 4 -> prompt is handled by the next useEffect
  }, [terminalStage, animationStarted]);

  // Show prompt after stage 4 is reached
  useEffect(() => {
    if (terminalStage === 4) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [terminalStage]);

  // Build the initial content based on the terminal stage
  const getInitialContent = () => {
    const content = [];

    // If animation hasn't started yet, show a placeholder message
    if (!animationStarted) {
      content.push(
        <div key="placeholder" className="text-neutral-500">
          Terminal initializing...
        </div>
      );
      return content;
    }

    if (terminalStage >= 1) {
      content.push(
        <TypewriterText
          key="init"
          text="Initializing profile data..."
          className="text-green-400"
          // No onComplete needed here as stage 1->2 is timer-based
        />
      );
    }

    if (terminalStage >= 2) {
      content.push(
        <div key="personal-info" className="mt-4">
          <TypewriterText
            text="Loading personal information..."
            speed={30}
            className="text-blue-400"
            // No onComplete needed here as stage 2->3 is timer-based
          />
          <div className="mt-3 pl-4 border-l-2 border-indigo-500/30">
            <div className="flex items-center mb-2">
              <User className="w-4 h-4 mr-2 text-indigo-400" />
              <TypewriterText text="Godwin" speed={50} />
            </div>
            <div className="flex items-center mb-2">
              <Code className="w-4 h-4 mr-2 text-indigo-400" />
              <TypewriterText text="Software Engineer" speed={50} />
            </div>
            <div className="flex items-center mb-2">
              <Globe className="w-4 h-4 mr-2 text-indigo-400" />
              <TypewriterText text="Waterloo, ON CA" speed={50} />
            </div>
          </div>
        </div>
      );
    }

    //TODO: modify this bio content to be a great elevator pitch
    if (terminalStage >= 3) {
      content.push(
        <TypewriterText
          key="bio"
          text="I'm a full-stack Software Engineer with 5 years of experience building scalable applications. I specialize in TypeScript and Python, with expertise in modern web technologies and cloud infrastructure. My approach combines technical excellence with practical problem-solving - I've successfully delivered complex features for both B2B and B2C startups, often leading development from concept to deployment. I'm passionate about writing clean, maintainable code and creating solutions that make a real impact."
          speed={10}
          className="text-gray-300 mt-4"
          onComplete={() => setTerminalStage(4)} // Trigger stage 4 on completion
        />
      );
    }

    if (terminalStage >= 4) {
      content.push(
        <TypewriterText
          key="interactive"
          text="Interactive mode activated. Type 'help' for available commands."
          speed={15}
          className="text-yellow-300 mt-4"
          // No onComplete needed here, prompt shows via useEffect
        />
      );
    }

    return content;
  };

  const customTitle = (
    <div className="flex items-center text-sm font-mono">
      <Terminal className="w-4 h-4 mr-2" />
      <span>about.sh — godwin@portfolio</span>
    </div>
  );

  return (
    <section
      ref={ref}
      id={id}
      className="py-20 md:py-28 bg-gradient-to-b from-gray-900 to-black text-gray-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InteractiveTerminal
              title="about.sh — godwin@portfolio"
              titleContent={customTitle}
              headerClassName="bg-gray-800 px-4 py-2"
              initialContent={getInitialContent()}
              showPrompt={showPrompt}
              availableCommands={availableCommands}
              className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl"
              autoFocus={showPrompt && isIntersecting}
            />
          </motion.div>

          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <HoverBorderGradient
                as="a"
                href="mailto:gawdwnn@gmail.com"
                containerClassName="rounded-full"
                className="bg-indigo-600 text-white font-semibold px-6 py-3 flex items-center"
                duration={1.5}
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </HoverBorderGradient>

              <HoverBorderGradient
                as="a"
                href="https://github.com/gawdwnn"
                target="_blank"
                rel="noopener noreferrer"
                containerClassName="rounded-full"
                className="bg-gray-800 text-white font-semibold px-6 py-3 flex items-center"
                duration={1.5}
              >
                <Github className="w-4 h-4 mr-2" />
                View GitHub
              </HoverBorderGradient>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
