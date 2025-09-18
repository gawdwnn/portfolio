import StreamingText from "@/components/StreamingText";
import React, { useCallback, useEffect, useState } from "react";

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
        '<span class="text-green-500">$</span>' +
        '<span class="text-white"> ' + escapeHtml(step.command) + "</span>";
      const outputPart = step.output
        .map(
          (line) =>
            '<div class="pl-6 text-neutral-400 mb-1">' +
            escapeHtml(line) +
            "</div>"
        )
        .join("");
      return commandPart + outputPart;
    },
    [escapeHtml]
  );

  return (
    <div className={className}>
      {steps.slice(0, Math.min(activeStep + 1, steps.length)).map((step, index) => (
        <div key={`${step.command}-${index}`} className="mb-6">
          {skipAnimation ? (
            <div
              className="inline-block font-mono text-base md:text-md"
              dangerouslySetInnerHTML={{ __html: buildStepContent(step) }}
            />
          ) : (
            <StreamingText
              content={buildStepContent(step)}
              speed="human"
              preserveWhitespace
              cursor={{ style: "line", blink: true }}
              onComplete={index === activeStep ? onStepComplete : undefined}
            />
          )}
        </div>
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
