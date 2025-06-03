import { Step } from "@/components/TerminalSequence";
import { TerminalOption } from "@/types/terminal";
import { useCallback, useEffect, useState } from "react";

/**
 * useTerminalState Hook
 *
 * Centralizes all terminal animation and menu state logic in one place.
 * Handles step progression, animation completion, and menu visibility.
 *
 * Features:
 * - Tracks current animation step
 * - Manages menu visibility
 * - Handles option selection
 * - Provides methods for step completion and skipping
 * - Ensures menu is always shown after animations complete
 * - Safely handles component mounting/initialization
 * - Supports replaying the animation sequence
 */

interface UseTerminalStateProps {
  steps: Step[];
  onSelectCall: () => void;
  onSelectCommandPalette?: () => void;
}

export function useTerminalState({
  steps,
  onSelectCall,
  onSelectCommandPalette,
}: UseTerminalStateProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TerminalOption | null>(
    null
  );
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    setHasInitialized(true);

    if (activeStep >= steps.length) {
      setShowMenu(true);
    }
  }, [activeStep, steps.length]);

  const handleStepComplete = useCallback(() => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === steps.length - 1) {
      setActiveStep(steps.length);
      setTimeout(() => {
        setShowMenu(true);
      }, 1000);
    }
  }, [activeStep, steps.length]);

  const handleSkip = useCallback(() => {
    setActiveStep(steps.length);
    setShowMenu(true);
  }, [steps.length]);

  const handleReplay = useCallback(() => {
    setShowMenu(false);
    setSelectedOption(null);

    setTimeout(() => {
      setActiveStep(0);
    }, 100);
  }, []);

  const handleOptionSelect = useCallback(
    (option: TerminalOption) => {
      setSelectedOption(option);

      setTimeout(() => {
        if (option === TerminalOption.CALL) {
          onSelectCall();
        } else if (
          option === TerminalOption.COMMAND_PALETTE &&
          onSelectCommandPalette
        ) {
          onSelectCommandPalette();
        } else if (option === TerminalOption.REPLAY) {
          handleReplay();
        }

        setTimeout(() => setSelectedOption(null), 300);
      }, 400);
    },
    [onSelectCall, onSelectCommandPalette, handleReplay]
  );

  return {
    activeStep,
    showMenu,
    selectedOption,
    hasInitialized,
    setActiveStep,
    setShowMenu,
    handleStepComplete,
    handleSkip,
    handleReplay,
    handleOptionSelect,
  };
}
