"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import CommandPaletteProvider from "@/components/CommandPaletteProvider";
import ModalProvider from "@/components/ModalProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <ModalProvider>
        <CommandPaletteProvider>
          {children}
          <Toaster />
        </CommandPaletteProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}
