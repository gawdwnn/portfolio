"use client";

import { useCommandPalette } from "@/components/CommandPaletteProvider";
import HeadlineColumn from "@/components/HeadlineColumn";
import HeroBackground from "@/components/HeroBackground";
import TerminalColumn from "@/components/TerminalColumn";
import { terminalCommands } from "@/data";
import { useTerminalState } from "@/hooks/useTerminalState";
import { useEffect, useMemo, useRef } from "react";

interface HeroProps {
  onBookCallClick: () => void;
  id?: string;
}

export default function Hero({ onBookCallClick, id }: HeroProps) {
  const { open: openCommandPalette } = useCommandPalette();
  const terminalRef = useRef<HTMLDivElement>(null);

  // Memoize steps array so it doesn't change on every render
  const steps = useMemo(() => terminalCommands, []);

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
      // Scroll to terminal with smooth behavior
      terminalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

    window.addEventListener("replay-intro", handleReplayIntro);

    return () => {
      window.removeEventListener("replay-intro", handleReplayIntro);
    };
  }, [handleReplay]);

  return (
    <section id={id} className="relative min-h-screen w-full">
      <HeroBackground />

      <div className="container relative z-10 mx-auto px-4 py-12 sm:py-20 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <TerminalColumn
            ref={terminalRef}
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
