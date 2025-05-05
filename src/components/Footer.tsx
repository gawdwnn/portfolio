"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Command,
  Cpu,
  Download,
  Github,
  Linkedin,
  Mail,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const [showOutput, setShowOutput] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [powerStatus, setPowerStatus] = useState("online");

  // Terminal command simulation
  const executeCommand = (cmd: string) => {
    setActiveCommand(cmd);
    setShowOutput(false);

    // Simulate typing
    const textLength = cmd.length;
    setCursorPosition(0);

    const typingInterval = setInterval(() => {
      setCursorPosition((prev) => {
        if (prev >= textLength) {
          clearInterval(typingInterval);
          setTimeout(() => setShowOutput(true), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 50);
  };

  // System stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPowerStatus((prev) => (prev === "online" ? "standby" : "online"));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const commands = [
    {
      id: "connect",
      label: "connect --social",
      output: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pl-6 pt-1 flex flex-wrap gap-3"
        >
          <a
            href="https://github.com/gawdwnn/"
            aria-label="GitHub"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 rounded text-xs font-mono hover:bg-neutral-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-3.5 h-3.5" />
            <span>/gawdwnn</span>
          </a>
          <a
            href="https://www.linkedin.com/in/gawdwnn/"
            aria-label="LinkedIn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 rounded text-xs font-mono hover:bg-neutral-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>/gawdwnn</span>
          </a>
          <a
            href="https://x.com/"
            aria-label="X (formerly Twitter)"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 rounded text-xs font-mono hover:bg-neutral-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <X className="w-3.5 h-3.5" />
            <span>@gawdwnn</span>
          </a>
          <a
            href="mailto:gawdwnn@gmail.com"
            aria-label="Email me"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 rounded text-xs font-mono hover:bg-neutral-800 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>gawdwnn@gmail.com</span>
          </a>
        </motion.div>
      ),
    },
    {
      id: "download",
      label: "download --resume",
      output: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pl-6 pt-1"
        >
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vTSZD4HTB4DCnJjt-xK7f6ocd8nVNcoh7MxJ7BGo214MzNxWXIPY3RFaEe-LAwtfmEcIuRBluYvMClq/pub"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 rounded text-xs font-mono hover:bg-indigo-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="w-3.5 h-3.5 mr-2" />
            <span>resume.pdf</span>
            <span className="ml-2 px-1 py-0.5 bg-black/30 rounded text-[10px]">
              5.2MB
            </span>
          </a>
          <div className="text-xs text-neutral-500 mt-1 font-mono">
            Downloading file... Complete
          </div>
        </motion.div>
      ),
    },
    {
      id: "about",
      label: "about --copyright",
      output: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pl-6 pt-1 text-xs font-mono"
        >
          <div className="text-indigo-400 mb-1">System Information</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-neutral-400">
            <div>OS</div>
            <div>Portfolio v1.0</div>
            <div>Author</div>
            <div>Godwin O.</div>
            <div>Copyright</div>
            <div>© {currentYear} All rights reserved</div>
            <div>License</div>
            <div>MIT</div>
          </div>
        </motion.div>
      ),
    },
  ];

  return (
    <footer className="py-8 px-6 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto">
        {/* Terminal header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div className="ml-2 text-xs text-neutral-500 font-mono">
              godwin@portfolio:~
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${
                powerStatus === "online"
                  ? "bg-emerald-900/30 text-emerald-500"
                  : "bg-amber-900/30 text-amber-500"
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>{powerStatus}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-400 text-xs">
              <Command className="w-3 h-3" />
              <span>Press K</span>
            </div>
          </div>
        </div>

        {/* Terminal body */}
        <div className="bg-black border border-neutral-800 rounded-lg p-3 font-mono text-sm text-neutral-200">
          <div className="flex flex-col">
            {commands.map((cmd) => (
              <div
                key={cmd.id}
                className={`cursor-pointer mb-3 ${
                  activeCommand === cmd.id
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-90"
                }`}
                onClick={() => executeCommand(cmd.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-green-500">$</span>
                  <span>
                    {activeCommand === cmd.id
                      ? cmd.label.substring(0, cursorPosition)
                      : cmd.label}
                    {activeCommand === cmd.id &&
                      cursorPosition < cmd.label.length && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="inline-block w-1.5 h-4 bg-neutral-200 ml-0.5"
                        />
                      )}
                  </span>
                </div>
                <AnimatePresence>
                  {activeCommand === cmd.id && showOutput && cmd.output}
                </AnimatePresence>
              </div>
            ))}

            {/* Prompt line */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-500">$</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-1.5 h-4 bg-neutral-200"
              />
            </div>
          </div>
        </div>

        {/* Keystroke hint */}
        <div className="mt-4 text-xs text-center text-neutral-500">
          Press{" "}
          <span className="text-white px-1 py-0.5 rounded bg-neutral-800 font-mono">
            Ctrl+K
          </span>{" "}
          to open command palette or{" "}
          <span className="text-white px-1 py-0.5 rounded bg-neutral-800 font-mono">
            click
          </span>{" "}
          on any command above
        </div>
      </div>
    </footer>
  );
}
