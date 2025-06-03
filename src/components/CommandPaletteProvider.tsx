"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import CommandPalette from "./CommandPalette";
import CommandPaletteTrigger from "./CommandPaletteTrigger";
import { useModal } from "./ModalProvider";

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
  onReplayIntro?: () => void;
}

export default function CommandPaletteProvider({
  children,
  onReplayIntro,
}: CommandPaletteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openBookingModal } = useModal();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Global keyboard shortcut for command palette using react-hotkeys-hook
  useHotkeys(
    'ctrl+k, meta+k',
    (e) => {
      e.preventDefault();
      toggle();
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
      enableOnContentEditable: true,
    },
    [toggle]
  );

  return (
    <CommandPaletteContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}

      <CommandPalette
        isOpen={isOpen}
        onClose={close}
        onScheduleCall={openBookingModal}
        onReplayIntro={onReplayIntro}
      />
      <CommandPaletteTrigger onClick={open} />
    </CommandPaletteContext.Provider>
  );
}
