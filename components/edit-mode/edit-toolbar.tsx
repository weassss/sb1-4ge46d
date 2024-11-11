"use client";

import { useEditMode } from "@/hooks/use-edit-mode";
import { useViewMode } from "@/hooks/use-view-mode";
import { motion } from "framer-motion";
import { ViewModeButtons } from "./view-mode-buttons";
import { EditModeButtons } from "./edit-mode-buttons";

export function EditToolbar() {
  const { isEditMode } = useEditMode();
  const { isStructureView } = useViewMode();

  // Remove the early return for structure view to always show the toolbar
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform"
    >
      <div className="rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 shadow-lg backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="flex items-center space-x-1.5">
          {isEditMode ? <EditModeButtons /> : <ViewModeButtons />}
        </div>
      </div>
    </motion.div>
  );
}