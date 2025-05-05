import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

/**
 * TerminalWindow Component
 *
 * A base UI component that provides the visual shell for all terminal interfaces.
 *
 * Features:
 * - Provides the frame, header, and content area for terminal UIs
 * - Includes the classic colored window control dots
 * - Supports customization of header style and title content
 * - Serves as the foundation for other terminal components
 *
 * This component is used by InteractiveTerminal and TerminalSequence to provide
 * consistent visual styling across different terminal behaviors.
 */
interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerClassName?: string;
  titleContent?: ReactNode;
}

// Base UI for terminal appearance
const TerminalWindow: React.FC<TerminalWindowProps> = ({
  children,
  title = "terminal",
  className = "",
  headerClassName = "",
  titleContent,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-lg overflow-hidden border border-neutral-800 bg-black/70 backdrop-blur-md",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 bg-neutral-900 px-3 py-2 border-b border-neutral-800",
          headerClassName
        )}
      >
        <div className="flex space-x-2 mr-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="ml-1 text-xs text-neutral-400">
          {titleContent || title}
        </div>
      </div>
      <div className="p-4 text-neutral-300 text-sm">{children}</div>
    </div>
  );
};

export default TerminalWindow;
