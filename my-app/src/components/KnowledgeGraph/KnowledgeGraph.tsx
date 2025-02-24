import { useState } from "react";
import { NodeProps } from "./NodeProps";
import NodeButton from "./NodeButton";
import NodeDetailedPage from "./NodeDetailedPage";

const KnowledgeGraph = () => {
  const [nodes] = useState<NodeProps[]>([
    {
      id: "1",
      title: "Node 1",
      content: "Node 1 content",
      Tags: ["tag1", "tag2"],
    },
    {
      id: "2",
      title: "Node 2",
      content: "Node 2 content",
      Tags: ["tag1", "tag3"],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeProps | null>(null);

  const handleNodeClick = (node: NodeProps) => {
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
      {nodes.map((node) => (
        <NodeButton
          key={node.id}
          label={node.title}
          onClick={() => handleNodeClick(node)}
        />
      ))}
      {selectedNode && (
        <NodeDetailedPage
          node={selectedNode}
          open={open}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default KnowledgeGraph;
