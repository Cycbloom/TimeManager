import { IconButton, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useCallback, useRef, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";

const NodeButton = ({ data }: any) => {
  const circleRef = useRef<SVGSVGElement>(null);
  const [handlePosition, setHandlePosition] = useState({
    top: "50%",
    left: "50%",
  });

  // 更新 Handle 的位置
  useEffect(() => {
    if (circleRef.current) {
      const circleRect = circleRef.current.getBoundingClientRect();
      const centerX = circleRect.left + circleRect.width / 2;
      const centerY = circleRect.top + circleRect.height / 2;

      // 相对于父容器的位置
      const parentRect =
        circleRef.current.parentElement!.getBoundingClientRect();
      const relativeTop = centerY - parentRect.top - 4; // Magic number 4
      const relativeLeft = centerX - parentRect.left;

      setHandlePosition({
        top: `${relativeTop}px`,
        left: `${relativeLeft}px`,
      });
    }
  }, [data.label]);

  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          position: "absolute",
          ...handlePosition,
          backgroundColor: "black",
          border: "none",
        }}
      />
      <IconButton style={{ marginRight: "16px", position: "relative" }}>
        <CircleIcon ref={circleRef} fontSize="small" />
        <Typography variant="caption" display="block" gutterBottom>
          {data.label}
        </Typography>
      </IconButton>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{
          position: "absolute",
          ...handlePosition,
          backgroundColor: "white",
          border: "none",
        }}
      />
    </>
  );
};

export default NodeButton;
