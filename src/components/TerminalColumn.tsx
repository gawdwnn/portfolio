import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Command, Terminal, Waves } from "lucide-react";
import CommandLine from "./CommandLine";
import TerminalWindow from "./TerminalWindow";
import TypewriterText from "./TypewriterText";

interface Step {
  command: string;
  output: string[];
}

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="order-2 lg:order-1"
    >
      <TerminalWindow title="godwin@portfolio ~ (zsh)">
        <div className="flex items-center gap-2 mb-6 text-indigo-400">
          <Waves className="w-5 h-5" />
          <span className="font-semibold">AI-Powered Portfolio</span>
          <span className="bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded text-xs ml-auto">
            v1.0.0
          </span>
        </div>

        {/* Steps execution */}
        {steps.map((step, index) => (
          <div key={index} className={index > activeStep ? "hidden" : "block"}>
            {index === activeStep && !showMenu ? (
              <div className="mb-6">
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-green-500">$</span>
                  <TypewriterText
                    text={step.command}
                    speed={80}
                    onComplete={() => setTimeout(handleStepComplete, 1000)}
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

        {/* Simplified menu with just 3 options - displayed after commands */}
        {showMenu && (
          <div className="mt-6 border-t border-neutral-800 pt-6">
            <div className="mb-2">
              <div className="flex items-start gap-2 mb-1">
                <span className="text-green-500">$</span>
                <span className="text-white">./connect.sh --interactive</span>
              </div>
            </div>

            <div className="pl-6 mb-6">
              <div className="text-cyan-300 mb-3">Select an option:</div>

              <div className="space-y-2 font-mono">
                {/* Chat option */}
                <div
                  className={cn(
                    "group flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors relative",
                    selectedOption === 1
                      ? "bg-indigo-600"
                      : "hover:bg-white/5 border border-indigo-500/30"
                  )}
                  onClick={() => handleOptionSelect(1)}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {selectedOption === 1 ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    ) : (
                      <div className="w-4 h-4 border border-indigo-400 rounded-sm group-hover:border-white transition-colors" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400 font-semibold group-hover:text-white transition-colors">
                      [1]
                    </span>
                    <Terminal className="w-4 h-4 text-indigo-200" />
                    <span className="text-white">Chat with me</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </div>

                {/* Book call option */}
                <div
                  className={cn(
                    "group flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors",
                    selectedOption === 2
                      ? "bg-indigo-600"
                      : "hover:bg-white/5 border border-indigo-500/30"
                  )}
                  onClick={() => handleOptionSelect(2)}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {selectedOption === 2 ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    ) : (
                      <div className="w-4 h-4 border border-indigo-400 rounded-sm group-hover:border-white transition-colors" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400 font-semibold group-hover:text-white transition-colors">
                      [2]
                    </span>
                    <Clock className="w-4 h-4 text-indigo-200" />
                    <span className="text-white">Schedule a call</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </div>

                {/* Command palette option */}
                <div
                  className={cn(
                    "group flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors",
                    selectedOption === 3
                      ? "bg-indigo-600"
                      : "hover:bg-white/5 border border-indigo-500/30"
                  )}
                  onClick={() => handleOptionSelect(3)}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {selectedOption === 3 ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    ) : (
                      <div className="w-4 h-4 border border-indigo-400 rounded-sm group-hover:border-white transition-colors" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400 font-semibold group-hover:text-white transition-colors">
                      [3]
                    </span>
                    <Command className="w-4 h-4 text-indigo-200" />
                    <span className="text-white">Command palette</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </div>
              </div>
            </div>

            {/* Terminal prompt */}
            <div className="flex items-start gap-2 mb-1 animate-pulse">
              <span className="text-green-500">$</span>
              <span className="text-white">_</span>
            </div>

            {/* Shortcut hint */}
            <div className="mt-4 text-neutral-500 text-xs">
              Tip: Press <span className="text-indigo-400">Ctrl/⌘K</span> for
              command palette
            </div>
          </div>
        )}

        {/* Add a manual "Skip" option for immediate access */}
        {!showMenu && activeStep < steps.length && (
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setActiveStep(steps.length);
                setShowMenu(true);
              }}
              className="text-indigo-400 text-xs hover:text-indigo-300 underline"
            >
              Skip animation
            </button>
          </div>
        )}
      </TerminalWindow>
    </motion.div>
  );
};

export default TerminalColumn;
