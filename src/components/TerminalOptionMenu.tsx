import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Command, Terminal } from "lucide-react";

/**
 * TerminalOptionMenu Component
 *
 * Displays a menu of interactive terminal options with selection feedback.
 *
 * Features:
 * - Shows three option buttons: Chat, Schedule Call, and Command Palette
 * - Handles option selection with visual feedback
 * - Triggers callbacks when options are selected
 * - Shows a helpful shortcut tip
 */
interface TerminalOptionMenuProps {
  selectedOption: number | null;
  handleOptionSelect: (option: number) => void;
}

const TerminalOptionMenu: React.FC<TerminalOptionMenuProps> = ({
  selectedOption,
  handleOptionSelect,
}) => {
  return (
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
        Tip: Press <span className="text-indigo-400">Ctrl/⌘K</span> for command
        palette
      </div>
    </div>
  );
};

export default TerminalOptionMenu;
