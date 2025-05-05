"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type BrandColorName = "primary" | "secondary" | "accent" | "accent2" | "muted";

type ColorVariant = "text" | "bg" | "border" | "ring" | "shadow";

interface ColorProps extends ComponentPropsWithoutRef<"div"> {
  color: BrandColorName;
  variant?: ColorVariant;
  children: ReactNode;
}

/**
 * A component that applies brand colors to its children
 */
export function BrandColor({
  color,
  variant = "text",
  className,
  children,
  ...props
}: ColorProps) {
  const colorClasses: Record<BrandColorName, Record<ColorVariant, string>> = {
    primary: {
      text: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-600 dark:bg-indigo-500",
      border: "border-indigo-600 dark:border-indigo-500",
      ring: "ring-indigo-600/50 dark:ring-indigo-500/50",
      shadow: "shadow-indigo-600/20 dark:shadow-indigo-500/20",
    },
    secondary: {
      text: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-600 dark:bg-cyan-500",
      border: "border-cyan-600 dark:border-cyan-500",
      ring: "ring-cyan-600/50 dark:ring-cyan-500/50",
      shadow: "shadow-cyan-600/20 dark:shadow-cyan-500/20",
    },
    accent: {
      text: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-600 dark:bg-rose-500",
      border: "border-rose-600 dark:border-rose-500",
      ring: "ring-rose-600/50 dark:ring-rose-500/50",
      shadow: "shadow-rose-600/20 dark:shadow-rose-500/20",
    },
    accent2: {
      text: "text-violet-500 dark:text-violet-400",
      bg: "bg-violet-500 dark:bg-violet-400",
      border: "border-violet-500 dark:border-violet-400",
      ring: "ring-violet-500/50 dark:ring-violet-400/50",
      shadow: "shadow-violet-500/20 dark:shadow-violet-400/20",
    },
    muted: {
      text: "text-gray-500 dark:text-gray-400",
      bg: "bg-gray-200 dark:bg-gray-800",
      border: "border-gray-300 dark:border-gray-700",
      ring: "ring-gray-300/50 dark:ring-gray-700/50",
      shadow: "shadow-gray-300/20 dark:shadow-gray-700/20",
    },
  };

  return (
    <div className={cn(colorClasses[color][variant], className)} {...props}>
      {children}
    </div>
  );
}

interface GradientTextProps extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode;
  from?: BrandColorName;
  via?: BrandColorName;
  to?: BrandColorName;
}

/**
 * Gradient text component using brand colors
 */
export function GradientText({
  children,
  from = "primary",
  via = "accent2",
  to = "secondary",
  className,
  ...props
}: GradientTextProps) {
  const gradientMap: Record<BrandColorName, string> = {
    primary: "from-indigo-600 dark:from-indigo-400",
    secondary: "to-cyan-600 dark:to-cyan-400",
    accent: "from-rose-600 dark:from-rose-400",
    accent2: "via-violet-500 dark:via-violet-400",
    muted: "via-gray-500 dark:via-gray-400",
  };

  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradientMap[from],
        via && gradientMap[via],
        gradientMap[to],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

interface GradientButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  from?: BrandColorName;
  to?: BrandColorName;
  hoverEffect?: boolean;
}

/**
 * Gradient button component using brand colors
 */
export function GradientButton({
  children,
  from = "primary",
  to = "secondary",
  hoverEffect = true,
  className,
  ...props
}: GradientButtonProps) {
  const gradientMap: Record<BrandColorName, { from: string; to: string }> = {
    primary: {
      from: "from-indigo-600 dark:from-indigo-500",
      to: "",
    },
    secondary: {
      from: "",
      to: "to-cyan-600 dark:to-cyan-500",
    },
    accent: {
      from: "from-rose-600 dark:from-rose-500",
      to: "",
    },
    accent2: {
      from: "from-violet-500 dark:from-violet-400",
      to: "to-purple-600 dark:to-purple-500",
    },
    muted: {
      from: "from-gray-500 dark:from-gray-600",
      to: "to-gray-600 dark:to-gray-700",
    },
  };

  return (
    <button
      className={cn(
        "relative group overflow-hidden px-6 py-2 rounded-lg font-medium text-white shadow-lg",
        "bg-gradient-to-r",
        gradientMap[from].from,
        gradientMap[to].to,
        hoverEffect && "transition-all duration-300",
        className
      )}
      {...props}
    >
      {hoverEffect && (
        <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
      )}
      <span className="relative">{children}</span>
    </button>
  );
}
