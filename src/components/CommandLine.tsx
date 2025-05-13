import React from "react";

interface CommandLineProps {
  command: string;
  output: string[];
}

const CommandLine: React.FC<CommandLineProps> = ({ command, output }) => {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-2 mb-1">
        <span className="text-green-500">$</span>
        <span className="text-white">{command}</span>
      </div>
      <div className="pl-6 text-neutral-400">
        {output.map((line, i) => (
          <div key={i} className="mb-1">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandLine;
