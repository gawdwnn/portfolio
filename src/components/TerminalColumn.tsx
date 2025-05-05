import { motion } from "framer-motion";
import { Waves } from "lucide-react";
import CommandLine from "./CommandLine";
import TerminalHeader from "./TerminalHeader";
import TerminalOptionMenu from "./TerminalOptionMenu";
import TerminalSequence, { Step } from "./TerminalSequence";
import TerminalWindow from "./TerminalWindow";

/**
 * TerminalColumn Component
 * ========================
 *
 * A terminal UI that transitions between two main modes: animation and interactive menu.
 * This component dynamically displays a sequence of commands with typed animation effects,
 * then transitions to an interactive menu once complete.
 *
 * Component Flow:
 * --------------
 * 1. Initial Render → Sequential Animation Mode (showMenu: false)
 * 2. As animations complete → activeStep increments
 * 3. When all steps are done → Transition to Menu Mode (showMenu: true)
 * 4. User interacts with Menu → Actions triggered based on selection
 *
 * The user can also skip the animation at any point by clicking the "Skip" button,
 * which instantly completes all steps and shows the menu.
 *
 * Modes:
 * ------
 * 1. Sequential Demonstration Mode (showMenu: false)
 *    - Shows a sequence of terminal commands with typewriter animations
 *    - Animated using TerminalSequence component
 *    - Current step animates with typewriter effect
 *    - Completed steps shown as static text
 *    - "Skip animation" button allows bypassing the sequence
 *
 * 2. Interactive Menu Mode (showMenu: true)
 *    - Displays all completed command outputs as static text
 *    - Shows menu interface with 3 clickable options:
 *      a. Chat with me
 *      b. Schedule a call
 *      c. Command palette
 *    - Provides visual feedback on selection
 *    - Shows helpful keyboard shortcut hint
 *
 * State Management:
 * ----------------
 * - activeStep: Controls current animation position (increments as steps complete)
 * - showMenu: Boolean flag that toggles between animation and menu modes
 * - selectedOption: Tracks which menu option is currently selected
 * - handleStepComplete: Callback triggered when a step animation finishes
 * - handleOptionSelect: Callback triggered when a menu option is clicked
 * - setActiveStep/setShowMenu: State setters passed from parent
 */
interface TerminalColumnProps {
  activeStep: number;
  steps: Step[];
  showMenu: boolean;
  selectedOption: number | null;
  handleOptionSelect: (option: number) => void;
  handleStepComplete: () => void;
  setActiveStep: (step: number) => void;
  setShowMenu: (show: boolean) => void;
}

const TerminalColumn = ({
  activeStep,
  steps,
  showMenu,
  selectedOption,
  handleOptionSelect,
  handleStepComplete,
  setActiveStep,
  setShowMenu,
}: TerminalColumnProps) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="order-2 lg:order-1"
    >
      {/* Conditional rendering based on showMenu state */}
      {!showMenu ? (
        // ===== ANIMATION MODE =====
        // Uses TerminalSequence for typewriter animations
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
        // ===== MENU MODE =====
        // Shows static command output + interactive menu
        <TerminalWindow
          title="godwin@portfolio ~ (zsh)"
          titleContent={customTitle}
        >
          {/* Terminal header with title and version */}
          <TerminalHeader />

          {/* Previously executed commands - preserves informational content */}
          {renderCompletedSteps()}

          {/* Interactive menu with clickable options */}
          <TerminalOptionMenu
            selectedOption={selectedOption}
            handleOptionSelect={handleOptionSelect}
          />
        </TerminalWindow>
      )}
    </motion.div>
  );
};

export default TerminalColumn;
