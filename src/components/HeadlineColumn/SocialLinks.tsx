import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { personalInfo } from "@/data";
import { LucideIcon } from "lucide-react";
import { SOCIAL_LINK_CONFIGS, type SocialLinkConfig } from "./constants";

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  tooltip: string;
  target?: string;
}

const SocialLink = ({
  href,
  icon: Icon,
  label,
  tooltip,
  target = "_blank",
}: SocialLinkProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        href={href}
        target={target !== "_self" ? target : undefined}
        rel={target !== "_self" ? "noopener noreferrer" : undefined}
        className="text-white/60 hover:text-white transition-colors"
        aria-label={label}
      >
        <Icon className="w-5 h-5" />
      </a>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

const getHrefForSocialLink = (config: SocialLinkConfig): string => {
  if (config.isEmail) {
    return `mailto:${personalInfo[config.key]}`;
  }
  return personalInfo[config.key] as string;
};

export const SocialLinks = () => (
  <div className="flex items-center gap-4">
    {SOCIAL_LINK_CONFIGS.map((config) => (
      <SocialLink
        key={config.key}
        href={getHrefForSocialLink(config)}
        icon={config.icon}
        label={config.label}
        tooltip={config.tooltip}
        target={config.target}
      />
    ))}
  </div>
);
