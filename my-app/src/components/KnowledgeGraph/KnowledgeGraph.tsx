import { useCallback, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  ConnectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodeProps, EdgeProps } from "./NodeProps";
import NodeButton from "./NodeButton";
import NodeDetailedPage from "./NodeDetailedPage";

const nodeTypes = {
  custom: NodeButton,
};

const initialNodes: NodeProps[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "1",
    },
    type: "custom",
    nodeData: {
      title: "Node 1",
      content: "Node 1 content",
      tags: ["tag1", "tag2"],
    },
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: {
      label: "2",
    },
    nodeData: {
      title: "Node 2",
      content: "Node 2 content",
      tags: ["tag1", "tag3"],
      parentId: "1",
    },
    type: "custom",
  },
];

const initialEdges: EdgeProps[] = [
  { id: "e1-2", source: "1", target: "2", label: "related" },
];

const KnowledgeGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeProps | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event: React.MouseEvent, node: NodeProps) => {
    setSelectedNode(node);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedNode(null);
    setOpen(false);
  };

  return (
    <>
      <h1>Knowledge Graph</h1>
      <div style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          connectionMode={ConnectionMode.Loose}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      {selectedNode && (
        <NodeDetailedPage
          node={selectedNode.nodeData}
          open={open}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default KnowledgeGraph;
