"use client";

import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Position,
  ConnectionMode,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { websiteStructure } from '@/lib/website-structure';
import { CustomNode } from './custom-node';
import { useEditMode } from "@/hooks/use-edit-mode";
import { useViewMode } from "@/hooks/use-view-mode";
import { toast } from "sonner";

const nodeTypes = {
  custom: CustomNode,
};

function createNodesAndEdges(structure: any[], parentId: string | null = null, x = 0, y = 0) {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let maxY = y;

  structure.forEach((item, index) => {
    const nodeId = item.id;
    const node: Node = {
      id: nodeId,
      type: 'custom',
      position: { x, y: y + index * 150 },
      data: { 
        label: item.label,
        type: item.type,
        id: item.id,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    nodes.push(node);
    maxY = Math.max(maxY, y + index * 150);

    if (parentId) {
      edges.push({
        id: `${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        type: 'smoothstep',
        animated: true,
      });
    }

    if (item.children) {
      const [childNodes, childEdges, childMaxY] = createNodesAndEdges(
        item.children,
        nodeId,
        x + 300,
        y + index * 300
      );
      nodes = nodes.concat(childNodes);
      edges = edges.concat(childEdges);
      maxY = Math.max(maxY, childMaxY);
    }
  });

  return [nodes, edges, maxY] as const;
}

const [initialNodes, initialEdges] = createNodesAndEdges(websiteStructure);

export function StructureFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { isEditMode } = useEditMode();
  const { isStructureView } = useViewMode();

  const onConnect = useCallback((params: any) => {
    if (!isEditMode) return;
    setEdges((eds) => addEdge(params, eds));
    toast.success("Connection created");
  }, [setEdges, isEditMode]);

  const onEdgesDelete = useCallback((edgesToDelete: Edge[]) => {
    if (!isEditMode) return;
    setEdges((eds) => eds.filter((edge) => !edgesToDelete.some((del) => del.id === edge.id)));
    toast.success("Connection removed");
  }, [setEdges, isEditMode]);

  const onNodeDragStart = useCallback(() => {
    if (!isEditMode) return;
    // Add any drag start logic here if needed
  }, [isEditMode]);

  const onNodeDrag = useCallback((event: React.MouseEvent, node: Node) => {
    if (!isEditMode) return;
    // Add any during-drag logic here if needed
  }, [isEditMode]);

  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node) => {
    if (!isEditMode) return;
    toast.success("Node position updated");
  }, [isEditMode]);

  // Only allow viewing in structure view, editing requires both structure view and edit mode
  const isInteractive = isStructureView && isEditMode;

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={isInteractive ? onNodesChange : undefined}
        onEdgesChange={isInteractive ? onEdgesChange : undefined}
        onConnect={isInteractive ? onConnect : undefined}
        onEdgesDelete={isInteractive ? onEdgesDelete : undefined}
        onNodeDragStart={isInteractive ? onNodeDragStart : undefined}
        onNodeDrag={isInteractive ? onNodeDrag : undefined}
        onNodeDragStop={isInteractive ? onNodeDragStop : undefined}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        nodesDraggable={isInteractive}
        nodesConnectable={isInteractive}
        elementsSelectable={isInteractive}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls 
          showInteractive={isStructureView}
          className={isInteractive ? "bg-blue-50 shadow-lg" : ""}
        />
      </ReactFlow>
    </div>
  );
}