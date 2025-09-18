import { useCommandPalette } from "@/components/CommandPaletteProvider";
import TerminalHeader from "@/components/TerminalHeader";
import TerminalOptionMenu from "@/components/TerminalOptionMenu";
import TerminalSequence, { Step } from "@/components/TerminalSequence";
import TerminalWindow from "@/components/TerminalWindow";
import { terminalCommands } from "@/data";
import { useTerminalState } from "@/hooks/useTerminalState";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";
import { useMemo, useRef } from "react";

interface TerminalColumnProps {
  onSelectCall: () => void;
}

export default function TerminalColumn({ onSelectCall }: TerminalColumnProps) {
  const { open: openCommandPalette } = useCommandPalette();
  const containerRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = useMemo(() => terminalCommands, []);

  const {
    activeStep,
    isFinished,
    selectedOption,
    handleStepComplete,
    handleSkip,
    handleOptionSelect,
  } = useTerminalState({
    steps,
    onSelectCall,
    onSelectCommandPalette: openCommandPalette,
  });
  const customTitle = useMemo(
    () => (
      <div className="flex items-center">
        <Waves className="w-4 h-4 mr-2 text-indigo-400" />
        <span>godwin@portfolio ~ (zsh)</span>
      </div>
    ),
    []
  );

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="order-2 lg:order-1"
    >
      <TerminalWindow titleContent={customTitle}>
        <TerminalHeader />

        <TerminalSequence
          steps={steps}
          activeStep={activeStep}
          onStepComplete={handleStepComplete}
          onSkip={handleSkip}
        />
        {isFinished && (
          <TerminalOptionMenu
            selectedOption={selectedOption}
            handleOptionSelect={handleOptionSelect}
          />
        )}
      </TerminalWindow>
    </motion.div>
  );
}
