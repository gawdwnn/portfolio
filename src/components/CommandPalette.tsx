"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Clock,
  Command,
  Home,
  Layers,
  Lightbulb,
  Mail,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export interface CommandItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduleCall?: () => void;
}

const CommandPalette = ({
  isOpen,
  onClose,
  onScheduleCall,
}: CommandPaletteProps) => {
  const createDefaultCommands = (): CommandItem[] => [
    {
      id: "home",
      name: "Home",
      category: "navigation",
      icon: "home",
      action: () => {
        const targetId = "hero-section";
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${targetId}`);
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      },
    },
    {
      id: "projects",
      name: "Projects",
      category: "navigation",
      icon: "projects",
      action: () => {
        const targetId = "projects-section";
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${targetId}`);
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      },
    },
    {
      id: "skills",
      name: "Skills",
      category: "navigation",
      icon: "skills",
      action: () => {
        const targetId = "skills-section";
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${targetId}`);
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      },
    },
    {
      id: "contact",
      name: "Contact",
      category: "navigation",
      icon: "contact",
      action: () => {
        const targetId = "about-section";
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${targetId}`);
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      },
    },
    {
      id: "call",
      name: "Schedule a call",
      category: "action",
      icon: "call",
      action: () => onScheduleCall && onScheduleCall(),
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const commandItemsRef = useRef<HTMLDivElement[]>([]);
  const commandsContainerRef = useRef<HTMLDivElement>(null);

  const commands = useMemo(
    () => createDefaultCommands(),
    [onScheduleCall]
  );

  const filterCommands = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredCommands = useMemo(() => {
    if (searchQuery) {
      return commands.filter((command) =>
        command.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return commands;
  }, [commands, searchQuery]);

  const getInitialSelectedIndex = useCallback(() => {
    if (!searchQuery) {
      const currentHash = window.location.hash;
      let activeCommandId: string | null = null;

      if (currentHash) {
        const sectionIdFromHash = currentHash.substring(1);
        if (sectionIdFromHash === "hero-section") activeCommandId = "home";
        else if (sectionIdFromHash === "projects-section")
          activeCommandId = "projects";
        else if (sectionIdFromHash === "skills-section")
          activeCommandId = "skills";
        else if (sectionIdFromHash === "about-section")
          activeCommandId = "contact";
      }

      if (activeCommandId) {
        const indexToSelect = commands.findIndex(
          (cmd) => cmd.id === activeCommandId && cmd.category === "navigation"
        );
        if (indexToSelect !== -1) {
          return indexToSelect;
        }
      }
    }
    return 0;
  }, [commands, searchQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        commandInputRef.current?.focus();
      }, 100);

      setSelectedCommandIndex(getInitialSelectedIndex());
    } else {
      setSearchQuery("");
      setSelectedCommandIndex(0);
      if (commandInputRef.current) {
        commandInputRef.current.value = "";
      }
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, getInitialSelectedIndex]);

  useHotkeys(
    'up',
    (e) => {
      if (!isOpen) return;
      e.preventDefault();
      setSelectedCommandIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : 0;
        setTimeout(() => {
          commandItemsRef.current[newIndex]?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }, 0);
        return newIndex;
      });
    },
    { enableOnFormTags: true, preventDefault: true },
    [isOpen, filteredCommands]
  );

  useHotkeys(
    'down',
    (e) => {
      if (!isOpen) return;
      e.preventDefault();
      setSelectedCommandIndex((prev) => {
        const newIndex = prev < filteredCommands.length - 1 ? prev + 1 : prev;
        setTimeout(() => {
          commandItemsRef.current[newIndex]?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }, 0);
        return newIndex;
      });
    },
    { enableOnFormTags: true, preventDefault: true },
    [isOpen, filteredCommands]
  );

  useHotkeys(
    'enter',
    (e) => {
      if (!isOpen || !filteredCommands[selectedCommandIndex]) return;
      e.preventDefault();
      filteredCommands[selectedCommandIndex].action();
      onClose();
    },
    { enableOnFormTags: true, preventDefault: true },
    [isOpen, filteredCommands, selectedCommandIndex, onClose]
  );

  useHotkeys(
    'esc',
    (e) => {
      if (!isOpen) return;
      e.preventDefault();
      onClose();
    },
    { enableOnFormTags: true, preventDefault: true },
    [isOpen, onClose]
  );

  const getCommandIcon = (command: CommandItem) => {
    switch (command.icon) {
      case "call":
        return <Clock className="w-3.5 h-3.5" />;
      case "command":
      case "terminal":
        return <Command className="w-3.5 h-3.5" />;
      case "home":
        return <Home className="w-3.5 h-3.5" />;
      case "projects":
        return <Layers className="w-3.5 h-3.5" />;
      case "skills":
        return <Lightbulb className="w-3.5 h-3.5" />;
      case "contact":
        return <Mail className="w-3.5 h-3.5" />;
      default:
        return <Search className="w-3.5 h-3.5" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh] px-4 sm:px-0"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
          <Command className="w-4 h-4 text-indigo-400" />
          <input
            ref={commandInputRef}
            className="bg-transparent border-0 outline-none text-white w-full placeholder:text-neutral-500 text-sm"
            placeholder="Type a command..."
            onChange={(e) => filterCommands(e.target.value)}
            value={searchQuery}
          />
          <div className="flex gap-1 text-xs w-full justify-end">
            <span className="bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono">
              ctrl/⌘K
            </span>
          </div>
        </div>

        <div 
          className="max-h-72 overflow-y-auto"
          ref={commandsContainerRef}
        >
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-6 text-neutral-500 text-sm text-center">
              <div className="mb-2 opacity-50">
                <Search className="w-5 h-5 mx-auto mb-2" />
                No results found
              </div>
              <div className="text-xs">Try a different search term</div>
            </div>
          ) : searchQuery ? (
            <div className="py-2">
              <div className="px-3 py-1 text-xs text-neutral-500 uppercase">
                Search Results
              </div>
              {filteredCommands.map((command, index) => (
                <div
                  key={command.id}
                  ref={(el) => {
                    if (el) commandItemsRef.current[index] = el;
                  }}
                  className={cn(
                    "px-4 py-2 cursor-pointer flex items-center gap-3 mx-1 rounded",
                    index === selectedCommandIndex
                      ? "bg-indigo-600/30 text-white"
                      : "hover:bg-white/5 text-neutral-300"
                  )}
                  onClick={() => {
                    command.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedCommandIndex(index)}
                >
                  <div
                    className={cn(
                      "w-7 h-7 flex items-center justify-center rounded",
                      index === selectedCommandIndex
                        ? "bg-indigo-500/30 text-indigo-300"
                        : "bg-neutral-800 text-neutral-400"
                    )}
                  >
                    {getCommandIcon(command)}
                  </div>
                  <span className="text-sm">{command.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <>
              {["navigation", "action", "terminal"].map((category) => {
                const categoryCommands = commands.filter(
                  (cmd) => cmd.category === category
                );
                if (categoryCommands.length === 0) return null;

                return (
                  <div key={category} className="py-2">
                    <div className="px-3 py-1 text-xs text-neutral-500 uppercase">
                      {category === "navigation"
                        ? "Navigation"
                        : category === "action"
                        ? "Actions"
                        : "Terminal"}
                    </div>
                    {categoryCommands.map((command) => {
                      const index = filteredCommands.findIndex(
                        (cmd) => cmd.id === command.id
                      );
                      return (
                        <div
                          key={command.id}
                          ref={(el) => {
                            if (el) commandItemsRef.current[index] = el;
                          }}
                          className={cn(
                            "px-4 py-2 cursor-pointer flex items-center gap-3 mx-1 rounded",
                            index === selectedCommandIndex
                              ? "bg-indigo-600/30 text-white"
                              : "hover:bg-white/5 text-neutral-300"
                          )}
                          onClick={() => {
                            command.action();
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedCommandIndex(index)}
                        >
                          <div
                            className={cn(
                              "w-7 h-7 flex items-center justify-center rounded",
                              index === selectedCommandIndex
                                ? "bg-indigo-500/30 text-indigo-300"
                                : "bg-neutral-800 text-neutral-400"
                            )}
                          >
                            {getCommandIcon(command)}
                          </div>
                          <span className="text-sm">{command.name}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="border-t border-neutral-800 px-4 py-2 text-xs text-neutral-500 flex justify-between items-center">
          <span className="inline-flex items-center gap-1">
            <span className="bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono">
              ↑
            </span>
            <span className="bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono">
              ↓
            </span>
            <span className="ml-1">to navigate</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono">
              Enter
            </span>
            <span className="ml-1">to select</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono">
              Esc
            </span>
            <span className="ml-1">to close</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CommandPalette;
