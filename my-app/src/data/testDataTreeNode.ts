export default {
  nodes: [
    {
      id: "node-1",
      label: "知识点A",
      type: "concept",
      tags: ["tag1", "tag2"],
      parentId: null,
      childrenIds: ["node-2", "node-3"],
    },
    {
      id: "node-2",
      label: "知识点B",
      type: "concept",
      tags: ["tag1"],
      parentId: "node-1",
      childrenIds: [],
    },
  ],
  edges: [
    {
      id: "edge-1",
      source: "node-1",
      target: "node-2",
      label: "依赖关系",
    },
  ],
};
