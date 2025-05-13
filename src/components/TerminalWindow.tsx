import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerClassName?: string;
  titleContent?: ReactNode;
}

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
