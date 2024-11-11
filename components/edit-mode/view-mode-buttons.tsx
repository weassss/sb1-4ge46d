"use client";

import { Moon, Sun, Globe, Network, Pencil } from "lucide-react";
import { useTheme } from "next-themes";
import { ToolbarButton } from "./toolbar-button";
import { useViewMode } from "@/hooks/use-view-mode";
import { useEditMode } from "@/hooks/use-edit-mode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
];

export function ViewModeButtons() {
  const { theme, setTheme } = useTheme();
  const { isStructureView, toggleStructureView } = useViewMode();
  const { isEditMode, toggleEditMode } = useEditMode();

  return (
    <>
      <ToolbarButton
        icon={theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        tooltip="Toggle theme"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <ToolbarButton
              icon={<Globe className="h-4 w-4" />}
              onClick={() => {}}
              tooltip="Change language"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {languages.map((lang) => (
            <DropdownMenuItem key={lang.code}>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

      <ToolbarButton
        icon={<Network className="h-4 w-4" />}
        onClick={toggleStructureView}
        tooltip={isStructureView ? "Exit structure view" : "View structure"}
        variant={isStructureView ? "default" : "ghost"}
      />

      <ToolbarButton
        icon={<Pencil className="h-4 w-4" />}
        onClick={toggleEditMode}
        tooltip="Toggle edit mode"
        variant={isEditMode ? "default" : "ghost"}
      />
    </>
  );
}