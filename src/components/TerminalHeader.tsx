import { Waves } from "lucide-react";
import React from "react";

const TerminalHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-6 text-indigo-400">
      <Waves className="w-5 h-5" />
      <span className="font-semibold">Portfolio</span>
      <span className="bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded text-xs ml-auto">
        v1.0.1
      </span>
    </div>
  );
};

export default TerminalHeader;
