"use client";

import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useEditMode } from "@/hooks/use-edit-mode";
import { useViewMode } from "@/hooks/use-view-mode";
import { PageDetails } from './page-details';

const nodeColors = {
  page: 'bg-blue-500',
  component: 'bg-gray-600',
  element: 'bg-gray-400',
} as const;

const nodeStyles = {
  page: 'border-2 border-blue-600',
  component: 'border-2 border-gray-700',
  element: 'border-2 border-gray-500',
} as const;

type NodeData = {
  label: string;
  type: keyof typeof nodeColors;
  id: string;
};

export const CustomNode = memo(({ data }: { data: NodeData }) => {
  const { isEditMode } = useEditMode();
  const { isStructureView } = useViewMode();
  const [isSelected, setIsSelected] = useState(false);

  // Only allow editing when both structure view and edit mode are active
  const isInteractive = isStructureView && isEditMode;

  return (
    <>
      <div 
        className={`px-4 py-2 shadow-md rounded-md transition-all duration-200 ${nodeColors[data.type]} ${nodeStyles[data.type]} ${
          isInteractive ? 'ring-2 ring-blue-300 cursor-move hover:ring-blue-400' : ''
        }`}
        onClick={() => data.type === 'page' && setIsSelected(!isSelected)}
      >
        {isStructureView && (
          <Handle 
            type="target" 
            position={Position.Left} 
            className={`w-2 h-2 ${isInteractive ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-400'}`}
          />
        )}
        <div className="text-white font-medium select-none">{data.label}</div>
        {isStructureView && (
          <Handle 
            type="source" 
            position={Position.Right} 
            className={`w-2 h-2 ${isInteractive ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-400'}`}
          />
        )}
      </div>
      {data.type === 'page' && (
        <PageDetails nodeId={data.id} isVisible={isSelected} />
      )}
    </>
  );
});

CustomNode.displayName = 'CustomNode';