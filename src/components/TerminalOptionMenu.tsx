import { cn } from "@/lib/utils";
import { TerminalOption } from "@/types/terminal";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Command, RefreshCw } from "lucide-react";

interface TerminalOptionMenuProps {
  selectedOption: TerminalOption | null;
  handleOptionSelect: (option: TerminalOption) => void;
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
          {/* Book call option */}
          <div
            className={cn(
              "group flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors",
              selectedOption === TerminalOption.CALL
                ? "bg-indigo-600"
                : "hover:bg-white/5 border border-indigo-500/30"
            )}
            onClick={() => handleOptionSelect(TerminalOption.CALL)}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {selectedOption === TerminalOption.CALL ? (
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
              <Clock className="w-4 h-4 text-indigo-200" />
              <span className="text-white">Schedule a call</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
          </div>

          {/* Command palette option */}
          <div
            className={cn(
              "group flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors",
              selectedOption === TerminalOption.COMMAND_PALETTE
                ? "bg-indigo-600"
                : "hover:bg-white/5 border border-indigo-500/30"
            )}
            onClick={() => handleOptionSelect(TerminalOption.COMMAND_PALETTE)}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {selectedOption === TerminalOption.COMMAND_PALETTE ? (
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
              <Command className="w-4 h-4 text-indigo-200" />
              <span className="text-white">Command palette</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
          </div>

          {/* Replay animation option */}
          <div
            className={cn(
              "group flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors",
              selectedOption === TerminalOption.REPLAY
                ? "bg-indigo-600"
                : "hover:bg-white/5 border border-indigo-500/30"
            )}
            onClick={() => handleOptionSelect(TerminalOption.REPLAY)}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {selectedOption === TerminalOption.REPLAY ? (
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
              <RefreshCw className="w-4 h-4 text-indigo-200" />
              <span className="text-white">Replay intro</span>
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
        Tip: Press <span className="text-indigo-400">ctrl/⌘K</span> for command
        palette
      </div>
    </div>
  );
};

export default TerminalOptionMenu;
