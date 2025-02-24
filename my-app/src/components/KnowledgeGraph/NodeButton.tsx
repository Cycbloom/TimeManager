import { IconButton, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

const NodeButton = ({ data }: any) => {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <IconButton style={{ marginRight: "16px" }}>
          <CircleIcon fontSize="large" />
          <Typography variant="caption" display="block" gutterBottom>
            {data.label}
          </Typography>
        </IconButton>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
};

export default NodeButton;
