"use client";

import { create } from "zustand";

interface ViewModeStore {
  isStructureView: boolean;
  setStructureView: (value: boolean) => void;
  toggleStructureView: () => void;
}

export const useViewMode = create<ViewModeStore>((set) => ({
  isStructureView: false,
  setStructureView: (value: boolean) => set({ isStructureView: value }),
  toggleStructureView: () => set((state) => ({ isStructureView: !state.isStructureView })),
}));