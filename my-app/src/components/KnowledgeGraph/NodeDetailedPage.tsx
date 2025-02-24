import { Box, Modal, Typography } from "@mui/material";
import { NodeProps } from "./NodeProps";

interface Props {
  node: NodeProps;
  open: boolean;
  onClose: () => void;
}

const NodeDetailedPage = ({ node, open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h4">{node.title}</Typography>
        <Typography variant="body1">{node.content}</Typography>
        <Typography variant="body2">{node.Tags.join(", ")}</Typography>
      </Box>
    </Modal>
  );
};

export default NodeDetailedPage;
