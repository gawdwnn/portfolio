import { motion } from "framer-motion";
import { Command } from "lucide-react";

interface CommandPaletteTriggerProps {
  onClick: () => void;
}

const CommandPaletteTrigger = ({ onClick }: CommandPaletteTriggerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed top-6 right-6 z-20"
    >
      <button
        onClick={onClick}
        className="group flex items-center gap-2 text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
      >
        <Command className="w-3.5 h-3.5" />
        <span>ctrl/⌘K</span>
      </button>
    </motion.div>
  );
};

export default CommandPaletteTrigger;
