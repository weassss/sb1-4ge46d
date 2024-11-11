"use client";

import { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
} from 'react-flow-renderer';
import { websiteStructure } from './website-structure';

const nodeTypes = {
  page: 'group',
  component: 'default',
  element: 'output',
};

const nodeColors = {
  page: '#3b82f6',
  component: '#6b7280',
  element: '#9ca3af',
};

function createNodesAndEdges(structure: any[], parentId: string | null = null, x = 0, y = 0) {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let maxY = y;

  structure.forEach((item, index) => {
    const nodeId = item.id;
    const node: Node = {
      id: nodeId,
      type: nodeTypes[item.type as keyof typeof nodeTypes],
      position: { x, y: y + index * 100 },
      data: { 
        label: item.label,
      },
      style: {
        background: nodeColors[item.type as keyof typeof nodeColors],
        color: 'white',
        borderRadius: '8px',
        padding: '10px',
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    nodes.push(node);
    maxY = Math.max(maxY, y + index * 100);

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
        y + index * 200
      );
      nodes = nodes.concat(childNodes);
      edges = edges.concat(childEdges);
      maxY = Math.max(maxY, childMaxY);
    }
  });

  return [nodes, edges, maxY] as const;
}

const [initialNodes, initialEdges] = createNodesAndEdges(websiteStructure);

export default function StructureVisualization() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  return (
    <div className="h-screen w-full bg-white dark:bg-gray-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}