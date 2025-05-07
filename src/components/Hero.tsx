"use client";

import { useEffect, useState } from "react";
import { useSpotlightEffect } from "../hooks/useSpotlightEffect";
import ChatOverlay from "./ChatOverlay";
import CommandPalette, { CommandItem } from "./CommandPalette";
import CommandPaletteTrigger from "./CommandPaletteTrigger";
import HeadlineColumn from "./HeadlineColumn";
import HeroBackground from "./HeroBackground";
import TerminalColumn from "./TerminalColumn";

interface HeroProps {
  onBookCallClick: () => void;
  id?: string;
}

export default function Hero({ onBookCallClick, id }: HeroProps) {
  const [showChat, setShowChat] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  const mousePosition = useSpotlightEffect(); // Use the custom hook

  // Define commands here, passing necessary actions
  const commands: CommandItem[] = [
    {
      id: "home",
      name: "Home",
      category: "navigation",
      icon: "home",
      action: () => {
        const targetId = "hero-section";
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${targetId}`);
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      },
    },
    {
      id: "projects",
      name: "Projects",
      category: "navigation",
      icon: "projects",
      action: () => {
        const targetId = "projects-section";
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${targetId}`);
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      },
    },
    {
      id: "skills",
      name: "Skills",
      category: "navigation",
      icon: "skills",
      action: () => {
        const targetId = "skills-section";
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${targetId}`);
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      },
    },
    {
      id: "contact",
      name: "Contact",
      category: "navigation",
      icon: "contact",
      action: () => {
        const targetId = "about-section"; // Assuming 'about-section' is the ID for Contact
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${targetId}`);
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      },
    },

    // Action commands
    {
      id: "chat",
      name: "Chat with me",
      category: "action",
      icon: "chat",
      action: () => setShowChat(true),
    },
    {
      id: "call",
      name: "Schedule a call",
      category: "action",
      icon: "call",
      action: () => onBookCallClick(),
    },

  ];

  // Keyboard shortcut handler for command palette toggle ONLY
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette toggle with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); // Dependency array is now empty as it only handles toggle

  const steps = [
    {
      command: "whoami",
      output: ["Godwin O.", "Product Engineer & AI Agents Specialist"],
    },
    {
      command: "cat skills.txt",
      output: [
        "Next.js • React • TypeScript • AI Integration",
        "Design Systems • API Development • Cloud Architecture",
      ],
    },
    {
      command: "echo $MISSION",
      output: [
        "Building great products that solve real problems",
        "at the intersection of design, code and AI.",
      ],
    },
  ];

  // Trigger next step
  const handleStepComplete = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === steps.length - 1) {
      setActiveStep(steps.length);
      setTimeout(() => {
        setShowMenu(true);
      }, 1000);
    }
  };

  // Handle option selection from TerminalColumn
  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);

    setTimeout(() => {
      if (option === 1) {
        setShowChat(true);
      } else if (option === 2) {
        onBookCallClick();
      } else if (option === 3) {
        setShowCommandPalette(true); // Open palette via terminal option
      }

      setTimeout(() => setSelectedOption(null), 300);
    }, 400);
  };

  return (
    <section
      id={id}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-neutral-900"
      // Apply spotlight effect using the hook
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    >
      {/* Render the background component */}
      <HeroBackground />

      {/* Render Command Palette Component */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        commands={commands}
      />

      {/* Render Command palette trigger */}
      <CommandPaletteTrigger onClick={() => setShowCommandPalette(true)} />

      <div className="container relative z-10 mx-auto px-4 py-12 sm:py-20 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <TerminalColumn
            activeStep={activeStep}
            steps={steps}
            showMenu={showMenu}
            selectedOption={selectedOption}
            handleOptionSelect={handleOptionSelect}
            handleStepComplete={handleStepComplete}
            setActiveStep={setActiveStep}
            setShowMenu={setShowMenu}
          />

          {/* Right column: Headline and visualization */}
          <HeadlineColumn
            onShowChat={() => setShowChat(true)}
            onBookCallClick={onBookCallClick}
            onShowCommandPalette={() => setShowCommandPalette(true)}
          />
        </div>
      </div>

      {showChat && <ChatOverlay onClose={() => setShowChat(false)} />}
    </section>
  );
}
