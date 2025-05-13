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

  // Initialize state - ensures menu shows on reload if animation would be complete
  useEffect(() => {
    // Mark component as initialized
    setHasInitialized(true);

    // If we're at the last step or beyond, show the menu
    if (activeStep >= steps.length) {
      setShowMenu(true);
    }
  }, [activeStep, steps.length]);

  // Handle step completion
  const handleStepComplete = useCallback(() => {
    if (activeStep < steps.length - 1) {
      // Move to next step
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === steps.length - 1) {
      // Last step completed, transition to menu
      setActiveStep(steps.length);
      // Show menu after a short delay to allow for smooth transition
      setTimeout(() => {
        setShowMenu(true);
      }, 1000);
    }
  }, [activeStep, steps.length]);

  // Handle skip - immediately show menu
  const handleSkip = useCallback(() => {
    setActiveStep(steps.length);
    setShowMenu(true);
  }, [steps.length]);

  // Handle replay - reset terminal to initial state
  const handleReplay = useCallback(() => {
    // Hide menu and reset to first step
    setShowMenu(false);
    setSelectedOption(null);

    // Use setTimeout to ensure state updates are processed
    // before starting the animation from the beginning
    setTimeout(() => {
      setActiveStep(0);
    }, 100);
  }, []);

  // Handle option selection
  const handleOptionSelect = useCallback(
    (option: TerminalOption) => {
      setSelectedOption(option);

      // Process the selected option after a brief delay
      setTimeout(() => {
        if (option === TerminalOption.CALL) {
          onSelectCall();
        } else if (
          option === TerminalOption.COMMAND_PALETTE &&
          onSelectCommandPalette
        ) {
          onSelectCommandPalette();
        } else if (option === TerminalOption.REPLAY) {
          // Replay option
          handleReplay();
        }

        // Reset selection state after a short delay
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
