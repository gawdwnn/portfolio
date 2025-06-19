import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";
import { ACTION_BUTTON_CONFIGS } from "./constants";

interface ActionButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  tooltip: string;
  className: string;
}

const ActionButton = ({
  onClick,
  icon: Icon,
  label,
  tooltip,
  className,
}: ActionButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button onClick={onClick} className={className} aria-label={label}>
        <Icon className="w-4 h-4" />
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
    <div className="flex items-center gap-3">
      {ACTION_BUTTON_CONFIGS.map((config) => (
        <ActionButton
          key={config.key}
          onClick={() => handleAction(config.action)}
          icon={config.icon}
          label={config.label}
          tooltip={config.tooltip}
          className={config.className}
        />
      ))}
    </div>
  );
};
