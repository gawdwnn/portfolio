"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import CommandPalette from "./CommandPalette";
import CommandPaletteTrigger from "./CommandPaletteTrigger";

// Create context for command palette
interface CommandPaletteContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

// Custom hook to access command palette context
export const useCommandPalette = () => useContext(CommandPaletteContext);

interface CommandPaletteProviderProps {
  children: React.ReactNode;
  onScheduleCall?: () => void;
  onReplayIntro?: () => void;
}

export default function CommandPaletteProvider({
  children,
  onScheduleCall,
  onReplayIntro,
}: CommandPaletteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette toggle with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}

      {/* Always render these components but control visibility via props */}
      <CommandPalette
        isOpen={isOpen}
        onClose={close}
        onScheduleCall={onScheduleCall}
        onReplayIntro={onReplayIntro}
      />
      <CommandPaletteTrigger onClick={open} />
    </CommandPaletteContext.Provider>
  );
}
