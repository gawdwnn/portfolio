import React, { ReactNode, useEffect } from "react";
import CommandLine from "@/components/CommandLine";
import TerminalWindow from "@/components/TerminalWindow";
import TypewriterText from "@/components/TypewriterText";

export interface Step {
  command: string;
  output: string[];
}

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
  useEffect(() => {
    if (activeStep >= steps.length && onStepComplete) {
      onStepComplete();
    }
  }, [activeStep, steps.length, onStepComplete]);

  const handleCommandComplete = (stepIndex: number) => {
    if (onStepComplete) {
      setTimeout(onStepComplete, 1000);
    }
  };

  return (
    <TerminalWindow
      title={title}
      titleContent={titleContent}
      headerClassName={headerClassName}
      className={className}
    >
      {children}

      {steps.map((step, index) => (
        <div key={index} className={index > activeStep ? "hidden" : "block"}>
          {index === activeStep ? (
            <div className="mb-6">
              <div className="flex items-start gap-2 mb-1">
                <span className="text-green-500">$</span>
                <TypewriterText
                  text={step.command}
                  speed={80}
                  onComplete={() => handleCommandComplete(index)}
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
