import StreamingText from "@/components/StreamingText";
import React, { useCallback, useEffect, useState } from "react";

interface TerminalStepProps {
  step: Step;
  buildStepContent: (step: Step) => string;
  isActive: boolean;
  isSkipped: boolean;
  isLastActiveStep: boolean;
  onComplete?: () => void;
}

const TerminalStep: React.FC<TerminalStepProps> = ({
  step,
  buildStepContent,
  isActive,
  isSkipped,
  isLastActiveStep,
  onComplete,
}) => {
  const terminalTextClasses =
    "block font-mono text-sm md:text-base text-neutral-300 leading-relaxed [&_.text-green-500]:text-green-500 [&_.text-neutral-300]:text-neutral-300 [&_.text-neutral-400]:text-neutral-400 [&_.pl-6]:pl-6 [&_.leading-relaxed]:leading-relaxed";

  const content = buildStepContent(step);

  return (
    <div className="relative mb-6">
      {/* 1. Invisible placeholder to reserve space and prevent layout shift */}
      <div
        className={`${terminalTextClasses} opacity-0`}
        dangerouslySetInnerHTML={{ __html: content }}
        aria-hidden="true"
      />

      {/* 2. Visible content that animates on top of the placeholder */}
      <div className="absolute top-0 left-0 w-full">
        {isActive &&
          (isSkipped ? (
            <div
              className={terminalTextClasses}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <StreamingText
              content={content}
              speed="human"
              preserveWhitespace
              cursor={{ style: "line", blink: true, color: "#10b981" }}
              onComplete={isLastActiveStep ? onComplete : undefined}
              className={terminalTextClasses}
            />
          ))}
      </div>
    </div>
  );
};

export interface Step {
  command: string;
  output: string[];
}

interface TerminalSequenceProps {
  steps: Step[];
  activeStep: number;
  className?: string;
  showSkip?: boolean;
  onStepComplete?: () => void;
  onSkip?: () => void;
}

const TerminalSequence: React.FC<TerminalSequenceProps> = ({
  steps,
  activeStep,
  className = "",
  showSkip = true,
  onStepComplete,
  onSkip,
}) => {
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    if (activeStep >= steps.length && onStepComplete) {
      onStepComplete();
    }
  }, [activeStep, steps.length, onStepComplete]);

  const escapeHtml = useCallback((str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }, []);

  const buildStepContent = useCallback(
    (step: Step) => {
      const commandPart = 
        '<span class="text-green-500">$</span> ' +
        '<span class="text-neutral-300">' + escapeHtml(step.command) + '</span>';
      
      if (step.output.length === 0) {
        return commandPart;
      }
      
      const outputPart = step.output
        .map(line => 
          '\n<div class="pl-6 text-neutral-400 leading-relaxed">' + 
          escapeHtml(line) + 
          '</div>'
        )
        .join('');
      
      return commandPart + outputPart;
    },
    [escapeHtml]
  );

  return (
    <div className={className}>
      {steps.map((step, index) => (
        <TerminalStep
          key={`${step.command}-${index}`}
          step={step}
          buildStepContent={buildStepContent}
          isActive={index <= activeStep}
          isSkipped={skipAnimation}
          isLastActiveStep={index === activeStep}
          onComplete={onStepComplete}
        />
      ))}

      {showSkip && activeStep < steps.length && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setSkipAnimation(true);
              onSkip?.();
            }}
            className="text-indigo-400 text-xs hover:text-indigo-300 underline"
          >
            Skip animation
          </button>
        </div>
      )}
    </div>
  );
};

export default TerminalSequence;
