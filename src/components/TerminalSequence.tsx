import React, { ReactNode } from "react";
import CommandLine from "./CommandLine";
import TerminalWindow from "./TerminalWindow";
import TypewriterText from "./TypewriterText";

export interface Step {
  command: string;
  output: string[];
}

/**
 * TerminalSequence Component
 *
 * A terminal component that displays a sequence of command steps with typewriter animations.
 *
 * Features:
 * - Displays a sequence of terminal commands and their outputs
 * - Animates the active step with typewriter effects
 * - Shows previously completed steps as static text
 * - Offers a skip option to bypass animations
 * - Supports custom styling through various props
 * - Accepts children to display optional content before commands
 *
 * Behavior:
 * - Steps progress one at a time based on activeStep prop
 * - Current step animates with typewriter effect, showing command then output
 * - Previous steps display as static text
 * - Future steps are hidden until reached
 * - When a step animation completes, it triggers onStepComplete callback
 * - User can skip animations with the "Skip animation" button (triggers onSkip)
 *
 * This component is used for sequential, animated command demonstrations like
 * those in the TerminalColumn component.
 */
interface TerminalSequenceProps {
  steps: Step[];
  activeStep: number;
  title?: string;
  titleContent?: ReactNode;
  headerClassName?: string;
  className?: string;
  showSkip?: boolean;
  onStepComplete?: () => void;
  onSkip?: () => void;
  children?: ReactNode;
}

// Sequential animation of commands
const TerminalSequence: React.FC<TerminalSequenceProps> = ({
  steps,
  activeStep,
  title = "terminal",
  titleContent,
  headerClassName,
  className = "",
  showSkip = true,
  onStepComplete,
  onSkip,
  children,
}) => {
  return (
    <TerminalWindow
      title={title}
      titleContent={titleContent}
      headerClassName={headerClassName}
      className={className}
    >
      {/* Optional content before commands */}
      {children}

      {/* Steps execution */}
      {steps.map((step, index) => (
        <div key={index} className={index > activeStep ? "hidden" : "block"}>
          {index === activeStep ? (
            <div className="mb-6">
              <div className="flex items-start gap-2 mb-1">
                <span className="text-green-500">$</span>
                <TypewriterText
                  text={step.command}
                  speed={80}
                  onComplete={() =>
                    onStepComplete && setTimeout(onStepComplete, 1000)
                  }
                />
              </div>
              <div className="pl-6 text-neutral-400">
                {step.output.map((line, i) => (
                  <TypewriterText
                    key={i}
                    text={line}
                    speed={20}
                    className="mb-1"
                  />
                ))}
              </div>
            </div>
          ) : (
            <CommandLine command={step.command} output={step.output} />
          )}
        </div>
      ))}

      {/* Add a manual "Skip" option for immediate access */}
      {showSkip && activeStep < steps.length && (
        <div className="mt-4 text-center">
          <button
            onClick={onSkip}
            className="text-indigo-400 text-xs hover:text-indigo-300 underline"
          >
            Skip animation
          </button>
        </div>
      )}
    </TerminalWindow>
  );
};

export default TerminalSequence;
