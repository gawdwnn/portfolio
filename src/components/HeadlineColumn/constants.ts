import { headlineData, personalInfo } from "@/data";
import {
  BrainCircuit,
  Briefcase,
  Clock,
  Code,
  Command,
  Download,
  Github,
  Linkedin,
  LucideIcon,
  Mail,
  Users,
} from "lucide-react";

// Stat card configurations
export interface StatConfig {
  key: keyof typeof headlineData.stats;
  label: string;
  icon: LucideIcon;
  hoverColor: string;
}

export const STAT_CONFIGS: StatConfig[] = [
  {
    key: "years",
    label: "Years Experience",
    icon: Briefcase,
    hoverColor: "group-hover:text-cyan-400",
  },
  {
    key: "projects",
    label: "Projects Completed",
    icon: Code,
    hoverColor: "group-hover:text-violet-400",
  },
  {
    key: "clients",
    label: "Happy Clients",
    icon: Users,
    hoverColor: "group-hover:text-indigo-400",
  },
  {
    key: "aiSolutions",
    label: "AI Solutions",
    icon: BrainCircuit,
    hoverColor: "group-hover:text-emerald-400",
  },
];

// Social link configurations
export interface SocialLinkConfig {
  key: keyof Pick<
    typeof personalInfo,
    "githubUrl" | "linkedinUrl" | "email" | "resumeUrl"
  >;
  icon: LucideIcon;
  label: string;
  tooltip: string;
  target?: string;
  isEmail?: boolean;
}

export const SOCIAL_LINK_CONFIGS: SocialLinkConfig[] = [
  {
    key: "githubUrl",
    icon: Github,
    label: "GitHub",
    tooltip: "View GitHub Profile",
  },
  {
    key: "linkedinUrl",
    icon: Linkedin,
    label: "LinkedIn",
    tooltip: "Connect/Chat on LinkedIn",
  },
  {
    key: "email",
    icon: Mail,
    label: "Email",
    tooltip: "Send an Email",
    target: "_self",
    isEmail: true,
  },
  {
    key: "resumeUrl",
    icon: Download,
    label: "Resume",
    tooltip: "View Resume",
  },
];

// Action button configurations
export interface ActionButtonConfig {
  key: string;
  icon: LucideIcon;
  label: string;
  tooltip: string;
  className: string;
  action: "bookCall" | "commandPalette";
}

export const ACTION_BUTTON_CONFIGS: ActionButtonConfig[] = [
  {
    key: "schedule-call",
    icon: Clock,
    label: "Schedule a call",
    tooltip: "Schedule a call",
    className:
      "flex items-center justify-center gap-2 p-2 rounded-md bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-medium transition-colors border border-indigo-500/50 shadow-sm",
    action: "bookCall",
  },
  {
    key: "command-palette",
    icon: Command,
    label: "Open Command Palette",
    tooltip: "Command Palette (ctrl/⌘ K)",
    className:
      "flex items-center justify-center gap-2 p-2 rounded-md bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm font-medium transition-colors border border-white/10",
    action: "commandPalette",
  },
];

// Layout constants
export const LAYOUT = {
  maxWidth: "max-w-xl",
  gap: {
    statGrid: "gap-4",
    socialLinks: "gap-4",
    actionButtons: "gap-3",
  },
  margin: {
    vertical: "mt-4 mb-6",
  },
} as const;
