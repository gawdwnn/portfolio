import React from "react";

const TerminalWindow = ({
  children,
  title = "terminal",
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-neutral-800 bg-black/70 backdrop-blur-md">
      <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-2 border-b border-neutral-800">
        <div className="w-3 h-3 rounded-full bg-rose-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
        <div className="ml-2 text-xs text-neutral-400">{title}</div>
      </div>
      <div className="p-4 text-neutral-300 text-sm">{children}</div>
    </div>
  );
};

export default TerminalWindow;
