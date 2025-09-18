import { headlineData, type PersonalInfo } from "@/data";
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
    label: "Years of Experience",
    icon: Briefcase,
    hoverColor: "group-hover:text-cyan-400",
  },
  {
    key: "projects",
    label: "Projects Shipped",
    icon: Code,
    hoverColor: "group-hover:text-violet-400",
  },
  {
    key: "clients",
    label: "Clients",
    icon: Users,
    hoverColor: "group-hover:text-indigo-400",
  },
  {
    key: "aiSolutions",
    label: "AI Solutions Shipped",
    icon: BrainCircuit,
    hoverColor: "group-hover:text-emerald-400",
  },
];

// Social link configurations
export interface SocialLinkConfig {
  key: keyof Pick<
    PersonalInfo,
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
    tooltip: "View GitHub",
  },
  {
    key: "linkedinUrl",
    icon: Linkedin,
    label: "LinkedIn",
    tooltip: "Connect on LinkedIn",
  },
  {
    key: "email",
    icon: Mail,
    label: "Email",
    tooltip: "Email me",
    target: "_self",
    isEmail: true,
  },
  {
    key: "resumeUrl",
    icon: Download,
    label: "Resume",
    tooltip: "View resume",
  },
];

export interface ActionButtonConfig {
  key: string;
  icon: LucideIcon;
  label: string;
  tooltip: string;
  action: "bookCall" | "commandPalette";
}

export const ACTION_BUTTON_CONFIGS: ActionButtonConfig[] = [
  {
    key: "schedule-call",
    icon: Clock,
    label: "Book a call",
    tooltip: "Book a 15-min intro",
    action: "bookCall",
  },
  {
    key: "command-palette",
    icon: Command,
    label: "Quick actions (⌘K)",
    tooltip: "Open quick actions (⌘K)",
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
