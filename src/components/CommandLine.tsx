import React from "react";

/**
 * CommandLine Component
 *
 * A simple component that displays a terminal command and its output in static form.
 *
 * Features:
 * - Shows a command with the terminal prompt ($)
 * - Displays command output as plain text
 * - Used for rendering completed or static command steps
 *
 * This component is used by TerminalSequence to display previously executed commands
 * and by TerminalColumn for static command displays.
 */
interface CommandLineProps {
  command: string;
  output: string[];
}

// Static display of commands and outputs
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
