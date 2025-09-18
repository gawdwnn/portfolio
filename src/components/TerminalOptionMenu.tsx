import { cn } from "@/lib/utils";
import { TerminalOption } from "@/types/terminal";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Command } from "lucide-react";
import type { ElementType } from "react";
import { useEffect } from "react";

interface TerminalOptionMenuProps {
  selectedOption: TerminalOption | null;
  handleOptionSelect: (option: TerminalOption) => void;
}

type OptionRowProps = {
  isSelected: boolean;
  onClick: () => void;
  keyHint: string;
  Icon: ElementType;
  label: string;
};

const OptionRow: React.FC<OptionRowProps> = ({
  isSelected,
  onClick,
  keyHint,
  Icon,
  label,
}) => (
  <div
    className={cn(
      "group flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors",
      isSelected ? "bg-indigo-600" : "hover:bg-white/5 border border-indigo-500/30"
    )}
    onClick={onClick}
  >
    <div className="w-5 h-5 flex items-center justify-center">
      {isSelected ? (
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
        [{keyHint}]
      </span>
      <Icon className="w-4 h-4 text-indigo-200" />
      <span className="text-white">{label}</span>
    </div>
    <ArrowUpRight className="w-3 h-3 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
  </div>
);

const TerminalOptionMenu: React.FC<TerminalOptionMenuProps> = ({
  selectedOption,
  handleOptionSelect,
}) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1") handleOptionSelect(TerminalOption.CALL);
      if (e.key === "2") handleOptionSelect(TerminalOption.COMMAND_PALETTE);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleOptionSelect]);

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
          {[
            {
              id: TerminalOption.CALL,
              keyHint: "1",
              label: "Schedule a call",
              Icon: Clock,
            },
            {
              id: TerminalOption.COMMAND_PALETTE,
              keyHint: "2",
              label: "Command palette",
              Icon: Command,
            },
          ].map(({ id, keyHint, label, Icon }) => (
            <OptionRow
              key={id}
              isSelected={selectedOption === id}
              onClick={() => handleOptionSelect(id)}
              keyHint={keyHint}
              Icon={Icon}
              label={label}
            />
          ))}

          {/* Replay option removed */}
        </div>
      </div>

      {/* Terminal prompt */}
      <div className="flex items-start gap-2 mb-1 animate-pulse">
        <span className="text-green-500">$</span>
        <span className="text-white">_</span>
      </div>

      {/* Shortcut hint */}
      <div className="mt-4 text-neutral-500 text-xs">
        Tip: Press <span className="text-indigo-400">ctrl/⌘ K</span> for command
        palette
      </div>
    </div>
  );
};

export default TerminalOptionMenu;
