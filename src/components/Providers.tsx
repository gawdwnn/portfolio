"use client";

import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";
import CommandPaletteProvider from "@/components/CommandPaletteProvider";
import ModalProvider from "@/components/ModalProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
        <CommandPaletteProvider>
          {children}
          <Toaster />
        </CommandPaletteProvider>
      </ModalProvider>
  );
}
