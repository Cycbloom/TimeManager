export interface NodeData {
  title: string; //卡片标题
  content: string; //卡片内容
  tags: string[];
  parentId?: string;
  hidden?: boolean;
}

export interface NodeProps {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
  };
  nodeData: NodeData;
  type?: string;
}

export interface EdgeProps {
  id: string;
  source: string;
  target: string;
  label?: string;
}
