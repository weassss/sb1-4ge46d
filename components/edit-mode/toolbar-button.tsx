"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip: string;
  variant?: "default" | "ghost" | "destructive" | "floating";
  disabled?: boolean;
  showOnSelect?: boolean;
  isSelected?: boolean;
}

export function ToolbarButton({
  icon,
  onClick,
  tooltip,
  variant = "ghost",
  disabled = false,
  showOnSelect = false,
  isSelected = false,
}: ToolbarButtonProps) {
  if (showOnSelect && !isSelected) {
    return null;
  }

  if (variant === "floating") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClick}
              className="h-6 w-6 rounded-full bg-blue-500 p-1 text-white hover:bg-blue-600 absolute -translate-y-1/2 transform"
              disabled={disabled}
            >
              {icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size="icon"
            onClick={onClick}
            className="h-7 w-7"
            disabled={disabled}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}