"use client";

import { useEffect, useMemo } from "react";
import { useSpotlightEffect } from "@/hooks/useSpotlightEffect";
import { useTerminalState } from "@/hooks/useTerminalState";
import { useCommandPalette } from "@/components/CommandPaletteProvider";
import HeadlineColumn from "@/components/HeadlineColumn";
import HeroBackground from "@/components/HeroBackground";
import TerminalColumn from "@/components/TerminalColumn";

interface HeroProps {
  onBookCallClick: () => void;
  id?: string;
}

export default function Hero({ onBookCallClick, id }: HeroProps) {
  const mousePosition = useSpotlightEffect();
  const { open: openCommandPalette } = useCommandPalette();

  // Memoize steps array so it doesn't change on every render
  const steps = useMemo(
    () => [
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
    ],
    []
  );

  const {
    activeStep,
    showMenu,
    selectedOption,
    setActiveStep,
    setShowMenu,
    handleStepComplete,
    handleSkip,
    handleReplay,
    handleOptionSelect,
  } = useTerminalState({
    steps,
    onSelectCall: onBookCallClick,
    onSelectCommandPalette: openCommandPalette,
  });

  // Add listener for the replay-intro event
  useEffect(() => {
    const handleReplayIntro = () => {
      handleReplay();
    };

    window.addEventListener("replay-intro", handleReplayIntro);

    return () => {
      window.removeEventListener("replay-intro", handleReplayIntro);
    };
  }, [handleReplay]);

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

          <HeadlineColumn onBookCallClick={onBookCallClick} />
        </div>
      </div>
    </section>
  );
}
