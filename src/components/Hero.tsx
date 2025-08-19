"use client";

import { useCommandPalette } from "@/components/CommandPaletteProvider";
import HeadlineColumn from "@/components/HeadlineColumn";
import HeroBackground from "@/components/HeroBackground";
import TerminalColumn from "@/components/TerminalColumn";
import { terminalCommands } from "@/data";
import { BACKGROUND_STYLES } from "@/lib/background-styles";
import { useTerminalState } from "@/hooks/useTerminalState";
import { useEffect, useMemo, useRef } from "react";

interface HeroProps {
  onBookCallClick: () => void;
  id?: string;
}

export default function Hero({ onBookCallClick, id }: HeroProps) {
  const { open: openCommandPalette } = useCommandPalette();
  const terminalRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleReplayIntro = () => {
      handleReplay();
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
    <section id={id} className={`relative min-h-screen w-full ${BACKGROUND_STYLES.sectionBorderBottom} ${BACKGROUND_STYLES.section}`}>
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
