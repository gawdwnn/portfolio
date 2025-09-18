import { Step } from "@/components/TerminalSequence";
import { TerminalOption } from "@/types/terminal";
import { useCallback, useState } from "react";

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
  const [selectedOption, setSelectedOption] = useState<TerminalOption | null>(
    null
  );
  const isFinished = activeStep >= steps.length;

  const handleStepComplete = useCallback(() => {
    if (activeStep < steps.length) {
      setActiveStep((prev) => prev + 1);
    }
  }, [activeStep, steps.length]);

  const handleSkip = useCallback(() => {
    setActiveStep(steps.length);
  }, [steps.length]);

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
        }

        setTimeout(() => setSelectedOption(null), 300);
      }, 400);
    },
    [onSelectCall, onSelectCommandPalette]
  );

  return {
    activeStep,
    isFinished,
    selectedOption,
    setActiveStep,
    handleStepComplete,
    handleSkip,
    handleOptionSelect,
  };
}
