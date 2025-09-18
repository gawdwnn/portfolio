import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";
import { ACTION_BUTTON_CONFIGS } from "../lib/constants";

interface ActionButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  tooltip: string;
}

const ActionButton = ({
  onClick,
  icon: Icon,
  label,
  tooltip,
}: ActionButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        className="text-white/60 hover:text-white transition-colors"
        aria-label={label}
      >
        <Icon className="w-5 h-5" />
      </button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

interface ActionButtonsProps {
  onBookCallClick: () => void;
  onCommandPaletteOpen: () => void;
}

export const ActionButtons = ({
  onBookCallClick,
  onCommandPaletteOpen,
}: ActionButtonsProps) => {
  const handleAction = (action: string) => {
    switch (action) {
      case "bookCall":
        onBookCallClick();
        break;
      case "commandPalette":
        onCommandPaletteOpen();
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {ACTION_BUTTON_CONFIGS.map((config) => (
        <ActionButton
          key={config.key}
          onClick={() => handleAction(config.action)}
          icon={config.icon}
          label={config.label}
          tooltip={config.tooltip}
        />
      ))}
    </div>
  );
};
