"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Globe, Layout, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TreeNode } from "./types";

export default function TreeView({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const getIcon = () => {
    switch (node.type) {
      case "page":
        return <Globe className="h-4 w-4" />;
      case "component":
        return <Layout className="h-4 w-4" />;
      case "element":
        return <Box className="h-4 w-4" />;
    }
  };

  return (
    <div className="ml-4">
      <div className="flex items-center space-x-2">
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        {!hasChildren && <div className="w-6" />}
        {getIcon()}
        <span
          className={`${
            node.type === "page"
              ? "font-bold text-blue-600 dark:text-blue-400"
              : node.type === "component"
              ? "font-semibold text-gray-800 dark:text-gray-200"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {node.label}
        </span>
      </div>
      {isOpen && hasChildren && (
        <div className="ml-6">
          {node.children?.map((child) => (
            <TreeView key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}