"use client";

import {
  Copy,
  Scissors,
  ClipboardPaste,
  Undo2,
  Redo2,
  X,
} from "lucide-react";
import { useEditMode } from "@/hooks/use-edit-mode";
import { ToolbarButton } from "./toolbar-button";

export function EditModeButtons() {
  const {
    toggleEditMode,
    undo,
    redo,
    copy,
    cut,
    paste,
    canUndo,
    canRedo,
  } = useEditMode();

  return (
    <>
      <ToolbarButton
        icon={<Undo2 className="h-4 w-4" />}
        onClick={undo}
        tooltip="Undo"
        disabled={!canUndo()}
      />
      <ToolbarButton
        icon={<Redo2 className="h-4 w-4" />}
        onClick={redo}
        tooltip="Redo"
        disabled={!canRedo()}
      />

      <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

      <ToolbarButton
        icon={<Copy className="h-4 w-4" />}
        onClick={copy}
        tooltip="Copy"
      />
      <ToolbarButton
        icon={<Scissors className="h-4 w-4" />}
        onClick={cut}
        tooltip="Cut"
      />
      <ToolbarButton
        icon={<ClipboardPaste className="h-4 w-4" />}
        onClick={paste}
        tooltip="Paste"
      />

      <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

      <ToolbarButton
        icon={<X className="h-4 w-4" />}
        onClick={toggleEditMode}
        tooltip="Exit edit mode"
        variant="destructive"
      />
    </>
  );
}