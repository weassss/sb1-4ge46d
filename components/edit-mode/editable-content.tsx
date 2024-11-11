"use client";

import { useState, useEffect, useRef } from "react";
import { useEditMode } from "@/hooks/use-edit-mode";
import { doc, updateDoc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { db, defaultContent } from "@/lib/firebase";
import { Pencil, Plus, Copy, Scissors, ClipboardPaste } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ToolbarButton } from "./toolbar-button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type BorderPosition = "top" | "right" | "bottom" | "left" | null;

interface EditableContentProps {
  content: string;
  path: string;
  field: string;
  className?: string;
}

export function EditableContent({
  content: initialContent,
  path,
  field,
  className = "",
}: EditableContentProps) {
  const { isEditMode, addToHistory } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [editedContent, setEditedContent] = useState(content);
  const [hoverBorder, setHoverBorder] = useState<BorderPosition>(null);
  const [isSelected, setIsSelected] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (!path || !field) return;

      try {
        const [collectionName, documentId] = path.split('/');
        const docRef = doc(collection(db, collectionName), documentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data[field] !== undefined) {
            setContent(data[field]);
            setEditedContent(data[field]);
          } else {
            const defaultValue = defaultContent[documentId]?.[field] || initialContent;
            setContent(defaultValue);
            setEditedContent(defaultValue);
            await updateDoc(docRef, { [field]: defaultValue });
          }
        } else {
          const defaultValue = defaultContent[documentId]?.[field] || initialContent;
          setContent(defaultValue);
          setEditedContent(defaultValue);
          await updateDoc(docRef, { [field]: defaultValue });
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent(initialContent);
        setEditedContent(initialContent);
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      fetchContent();
    }
  }, [path, field, initialContent, isInitialized]);

  useEffect(() => {
    if (!isInitialized || !path || !field) return;

    const [collectionName, documentId] = path.split('/');
    const docRef = doc(collection(db, collectionName), documentId);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data[field] !== undefined && !isEditing) {
          setContent(data[field]);
          setEditedContent(data[field]);
        }
      }
    });

    return () => unsubscribe();
  }, [path, field, isInitialized, isEditing]);

  const handleSave = async () => {
    if (!isInitialized || !path || !field) return;
    
    try {
      addToHistory({
        path,
        field,
        content,
      });

      const [collectionName, documentId] = path.split('/');
      const docRef = doc(collection(db, collectionName), documentId);
      await updateDoc(docRef, { [field]: editedContent });
      setContent(editedContent);
      setIsEditing(false);
      toast.success("Content updated successfully");
    } catch (error) {
      toast.error("Failed to update content");
      console.error("Error updating content:", error);
      setEditedContent(content);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editableRef.current || isEditing) return;

    const rect = editableRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const borderSize = 8;

    if (y < borderSize) setHoverBorder("top");
    else if (x > rect.width - borderSize) setHoverBorder("right");
    else if (y > rect.height - borderSize) setHoverBorder("bottom");
    else if (x < borderSize) setHoverBorder("left");
    else setHoverBorder(null);
  };

  const handleBorderClick = async (position: BorderPosition) => {
    if (!position || !path || !field) return;

    try {
      addToHistory({
        path,
        field,
        content,
      });

      const text = await navigator.clipboard.readText();
      const [collectionName, documentId] = path.split('/');
      const docRef = doc(collection(db, collectionName), documentId);
      
      let newContent = content;
      switch (position) {
        case "top":
        case "left":
          newContent = text + " " + content;
          break;
        case "bottom":
        case "right":
          newContent = content + " " + text;
          break;
      }

      await updateDoc(docRef, { [field]: newContent });
      setContent(newContent);
      setEditedContent(newContent);
      toast.success("Content inserted successfully");
    } catch (error) {
      toast.error("Failed to insert content");
      console.error("Error inserting content:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard");
  };

  const handleCut = async () => {
    if (!path || !field) return;

    addToHistory({
      path,
      field,
      content,
    });

    navigator.clipboard.writeText(content);
    setContent("");
    setEditedContent("");
    handleSave();
    toast.success("Content cut to clipboard");
  };

  const handlePaste = async () => {
    if (!path || !field) return;

    try {
      addToHistory({
        path,
        field,
        content,
      });

      const text = await navigator.clipboard.readText();
      setContent(text);
      setEditedContent(text);
      handleSave();
      toast.success("Content pasted from clipboard");
    } catch (error) {
      toast.error("Failed to paste content");
      console.error("Error pasting content:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isEditing && editableRef.current && !editableRef.current.contains(event.target as Node)) {
        handleSave();
      }
      if (isSelected && !editableRef.current?.contains(event.target as Node)) {
        setIsSelected(false);
      }
    };

    if (isEditing || isSelected) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, isSelected, editedContent]);

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editableRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  if (!isEditMode) {
    return <div className={className}>{content}</div>;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div 
          className={cn(
            "group relative cursor-pointer rounded-sm transition-all",
            className,
            isSelected && "ring-2 ring-blue-500"
          )}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverBorder(null)}
          onClick={(e) => {
            if (hoverBorder) {
              e.preventDefault();
              handleBorderClick(hoverBorder);
              setIsSelected(true);
            } else if (!isEditing) {
              setIsEditing(true);
              setIsSelected(true);
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !isEditing) {
              setIsEditing(true);
            } else if (e.key === 'Enter' && e.shiftKey && isEditing) {
              handleSave();
            }
          }}
        >
          <div className="relative" ref={editableRef}>
            <div className={cn(
              "absolute inset-0 pointer-events-none",
              "border-2 border-transparent transition-colors",
              hoverBorder === "top" && "border-t-blue-500",
              hoverBorder === "right" && "border-r-blue-500",
              hoverBorder === "bottom" && "border-b-blue-500",
              hoverBorder === "left" && "border-l-blue-500"
            )} />

            {hoverBorder && (
              <div className={cn(
                "absolute z-10",
                hoverBorder === "top" && "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                hoverBorder === "right" && "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
                hoverBorder === "bottom" && "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                hoverBorder === "left" && "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
              )}>
                <div className="bg-blue-500 rounded-full p-1">
                  <Plus className="h-3 w-3 text-white" />
                </div>
              </div>
            )}

            {isSelected && !isEditing && (
              <div className="absolute -right-24 top-1/2 flex -translate-y-1/2 items-center space-x-1">
                <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
                  <Copy className="h-3 w-3 cursor-pointer" onClick={handleCopy} />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
                  <Scissors className="h-3 w-3 cursor-pointer" onClick={handleCut} />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
                  <ClipboardPaste className="h-3 w-3 cursor-pointer" onClick={handlePaste} />
                </div>
              </div>
            )}

            <div
              contentEditable={isEditing}
              suppressContentEditableWarning
              onInput={(e) => {
                const newContent = e.currentTarget.textContent || '';
                setEditedContent(newContent);
              }}
              onBlur={() => isEditing && handleSave()}
              className={cn(
                "outline-none transition-all min-h-[1.5em] min-w-[1em]",
                isEditing && "ring-2 ring-green-500 rounded-sm px-1"
              )}
            >
              {content}
            </div>

            {!isEditing && !hoverBorder && !isSelected && (
              <div className="absolute -right-6 top-1/2 hidden -translate-y-1/2 transform group-hover:block">
                <Pencil className="h-4 w-4 text-green-500" />
              </div>
            )}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={handleCopy}>
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleCut}>
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={handlePaste}>
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}