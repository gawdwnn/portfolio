"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, Command, Search, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  commands: CommandItem[];
}

const CommandPalette = ({ isOpen, onClose, commands }: CommandPaletteProps) => {
  const [filteredCommands, setFilteredCommands] = useState(commands);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Simplified filterCommands, logic moved to useEffect
  const filterCommands = (query: string) => {
    setSearchQuery(query);
  };

  // Effect for handling palette open/close, command list changes, search query, and hash-based selection
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
      // Focus input when palette opens
      setTimeout(() => {
        commandInputRef.current?.focus();
      }, 100);

      // Determine current filtered list and selected index
      if (searchQuery) {
        const filtered = commands.filter((command) =>
          command.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCommands(filtered);
        setSelectedCommandIndex(0); // Reset index for new search results
      } else {
        // No search query: use all commands and try to select based on URL hash
        setFilteredCommands(commands); // Show all commands
        const currentHash = window.location.hash;
        let activeCommandId: string | null = null;

        if (currentHash) {
          const sectionIdFromHash = currentHash.substring(1); // Remove #
          // This mapping aligns with the target IDs set in Hero.tsx actions
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
            setSelectedCommandIndex(indexToSelect);
          } else {
            setSelectedCommandIndex(0); // Default if command not found or not navigation
          }
        } else {
          setSelectedCommandIndex(0); // Default if no relevant hash
        }
      }
    } else {
      // Palette is closing, reset its state
      setSearchQuery(""); // Clear search query
      setFilteredCommands(commands); // Reset to all commands
      setSelectedCommandIndex(0); // Reset selected index
      if (commandInputRef.current) {
        commandInputRef.current.value = ""; // Clear input field
      }
      document.body.style.overflow = ""; // Restore background scroll
    }

    // Cleanup function to ensure scroll is restored if component unmounts while open
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, commands, searchQuery]); // Dependencies updated

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return; // Only handle keys when open

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedCommandIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedCommandIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedCommandIndex]) {
          filteredCommands[selectedCommandIndex].action();
          onClose(); // Close palette after action
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose(); // Close palette on Escape
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedCommandIndex, onClose]); // Add dependencies

  // Get icon component based on command config
  const getCommandIcon = (command: CommandItem) => {
    switch (command.icon) {
      case "chat":
        return <Terminal className="w-3.5 h-3.5" />;
      case "call":
        return <Clock className="w-3.5 h-3.5" />;
      case "terminal":
        return <Command className="w-3.5 h-3.5" />;
      // Add cases for other icons if needed (navigation, etc.)
      // case "home": ...
      // case "projects": ...
      default:
        return <Search className="w-3.5 h-3.5" />; // Default icon
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
      onClick={onClose} // Close when clicking the overlay
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
              Ctrl/⌘K
            </span>
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-6 text-neutral-500 text-sm text-center">
              <div className="mb-2 opacity-50">
                <Search className="w-5 h-5 mx-auto mb-2" />
                No results found
              </div>
              <div className="text-xs">Try a different search term</div>
            </div>
          ) : searchQuery ? (
            // Search results view
            <div className="py-2">
              <div className="px-3 py-1 text-xs text-neutral-500 uppercase">
                Search Results
              </div>
              {filteredCommands.map((command, index) => (
                <div
                  key={command.id}
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
                  // Optional: Add mouse hover to update selected index
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
            // Categorized commands view
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
                      // Find the index in the *currently filtered* list (which is all commands when search is empty)
                      const index = filteredCommands.findIndex(
                        (cmd) => cmd.id === command.id
                      );
                      return (
                        <div
                          key={command.id}
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
