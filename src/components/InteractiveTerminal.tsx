import TerminalWindow from "@/components/TerminalWindow";
import { AnimatePresence, motion } from "framer-motion";
import React, { KeyboardEvent, ReactNode, useState } from "react";

export interface TerminalResponse {
  command: string;
  response: string | ReactNode;
}

interface InteractiveTerminalProps {
  title?: string;
  titleContent?: ReactNode;
  headerClassName?: string;
  initialContent?: ReactNode[];
  showPrompt?: boolean;
  availableCommands?: Record<string, string | ReactNode>;
  className?: string;
  autoFocus?: boolean;
  onCommand?: (command: string) => void;
}

const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  title = "terminal",
  titleContent,
  headerClassName,
  initialContent = [],
  showPrompt = true,
  availableCommands = {},
  className = "",
  autoFocus = false,
  onCommand,
}) => {
  const [userQuery, setUserQuery] = useState("");
  const [responses, setResponses] = useState<TerminalResponse[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userQuery.trim() !== "") {
      const command = userQuery.toLowerCase().trim();

      if (command === "clear") {
        setResponses([]);
      } else {
        const response =
          command in availableCommands
            ? availableCommands[command]
            : "Command not recognized. Try 'help' for available commands.";

        setResponses([...responses, { command: userQuery, response }]);
      }

      if (onCommand) {
        onCommand(command);
      }

      setUserQuery("");
    }
  };

  return (
    <TerminalWindow
      title={title}
      titleContent={titleContent}
      headerClassName={headerClassName}
      className={className}
    >
      <div className="font-mono text-base md:text-sm leading-relaxed">
        <AnimatePresence>
          {/* Initial content */}
          {initialContent.map((content, index) => (
            <motion.div
              key={`initial-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              {content}
            </motion.div>
          ))}

          {/* Display previous command responses */}
          {responses.map((item, index) => (
            <motion.div
              key={`response-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <div className="flex items-center text-white">
                <span className="text-green-400 mr-2">$ </span>
                <span>{item.command}</span>
              </div>
              <div className="pl-4 mt-1 text-gray-300 whitespace-pre-line">
                {item.response}
              </div>
            </motion.div>
          ))}

          {/* Interactive prompt */}
          {showPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center"
            >
              <span className="text-green-400 mr-2">$ </span>
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-base md:text-sm"
                placeholder="Type a command..."
                autoFocus={autoFocus}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TerminalWindow>
  );
};

export default InteractiveTerminal;
