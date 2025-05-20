import CommandLine from "@/components/CommandLine";
import TerminalHeader from "@/components/TerminalHeader";
import TerminalOptionMenu from "@/components/TerminalOptionMenu";
import TerminalSequence, { Step } from "@/components/TerminalSequence";
import TerminalWindow from "@/components/TerminalWindow";
import { TerminalOption } from "@/types/terminal";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";
import { forwardRef } from "react";

interface TerminalColumnProps {
  activeStep: number;
  steps: Step[];
  showMenu: boolean;
  selectedOption: TerminalOption | null;
  handleOptionSelect: (option: TerminalOption) => void;
  handleStepComplete: () => void;
  setActiveStep: (step: number) => void;
  setShowMenu: (show: boolean) => void;
}

const TerminalColumn = forwardRef<HTMLDivElement, TerminalColumnProps>(
  (
    {
      activeStep,
      steps,
      showMenu,
      selectedOption,
      handleOptionSelect,
      handleStepComplete,
      setActiveStep,
      setShowMenu,
    },
    ref
  ) => {
    const customTitle = (
      <div className="flex items-center">
        <Waves className="w-4 h-4 mr-2 text-indigo-400" />
        <span>godwin@portfolio ~ (zsh)</span>
      </div>
    );

    const handleSkip = () => {
      setActiveStep(steps.length);
      setShowMenu(true);
    };

    /**
     * Renders completed command steps as static text
     *
     * In menu mode, this renders all the command outputs that were
     * previously animated, ensuring informational content remains visible.
     */
    const renderCompletedSteps = () => {
      // Only render in menu mode - animation mode handled by TerminalSequence
      if (!showMenu) return null;

      // Render all steps as static CommandLine components
      return steps.map((step, index) => (
        <CommandLine key={index} command={step.command} output={step.output} />
      ));
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="order-2 lg:order-1"
      >
        {!showMenu ? (
          <TerminalSequence
            steps={steps}
            activeStep={activeStep}
            title="godwin@portfolio ~ (zsh)"
            titleContent={customTitle}
            onStepComplete={handleStepComplete}
            onSkip={handleSkip}
          >
            <TerminalHeader />
          </TerminalSequence>
        ) : (
          <TerminalWindow
            title="godwin@portfolio ~ (zsh)"
            titleContent={customTitle}
          >
            <TerminalHeader />
            {renderCompletedSteps()}
            <TerminalOptionMenu
              selectedOption={selectedOption}
              handleOptionSelect={handleOptionSelect}
            />
          </TerminalWindow>
        )}
      </motion.div>
    );
  }
);

TerminalColumn.displayName = "TerminalColumn";

export default TerminalColumn;
