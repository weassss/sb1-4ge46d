"use client";

import { create } from "zustand";
import { toast } from "sonner";
import { doc, collection, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface HistoryEntry {
  path: string;
  field: string;
  content: string;
  timestamp: number;
}

interface EditModeStore {
  isEditMode: boolean;
  setEditMode: (value: boolean) => void;
  toggleEditMode: () => void;
  history: HistoryEntry[];
  currentIndex: number;
  addToHistory: (entry: Omit<HistoryEntry, "timestamp">) => void;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export const useEditMode = create<EditModeStore>((set, get) => ({
  isEditMode: false,
  setEditMode: (value: boolean) => set({ isEditMode: value }),
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  history: [],
  currentIndex: -1,

  addToHistory: (entry: Omit<HistoryEntry, "timestamp">) => {
    const { history, currentIndex } = get();
    
    // If we're adding a new entry after some undos, truncate the future entries
    const newHistory = history.slice(0, currentIndex + 1);
    
    // Add the new entry
    newHistory.push({
      ...entry,
      timestamp: Date.now(),
    });

    // Update state with new history and increment currentIndex
    set({
      history: newHistory,
      currentIndex: newHistory.length - 1,
    });
  },

  undo: async () => {
    const { history, currentIndex } = get();
    if (currentIndex > 0) {
      const previousEntry = history[currentIndex - 1];
      try {
        const [collectionName, documentId] = previousEntry.path.split('/');
        const docRef = doc(collection(db, collectionName), documentId);
        
        // First update Firestore
        await updateDoc(docRef, { [previousEntry.field]: previousEntry.content });
        
        // Then update local state
        set({ currentIndex: currentIndex - 1 });
        
        toast.success("Undo successful");
      } catch (error) {
        console.error("Error during undo:", error);
        toast.error("Failed to undo");
      }
    } else {
      toast.error("Nothing to undo");
    }
  },

  redo: async () => {
    const { history, currentIndex } = get();
    if (currentIndex < history.length - 1) {
      const nextEntry = history[currentIndex + 1];
      try {
        const [collectionName, documentId] = nextEntry.path.split('/');
        const docRef = doc(collection(db, collectionName), documentId);
        
        // First update Firestore
        await updateDoc(docRef, { [nextEntry.field]: nextEntry.content });
        
        // Then update local state
        set({ currentIndex: currentIndex + 1 });
        
        toast.success("Redo successful");
      } catch (error) {
        console.error("Error during redo:", error);
        toast.error("Failed to redo");
      }
    } else {
      toast.error("Nothing to redo");
    }
  },

  canUndo: () => {
    const { currentIndex } = get();
    return currentIndex > 0;
  },

  canRedo: () => {
    const { history, currentIndex } = get();
    return currentIndex < history.length - 1;
  },
}));