import { IconButton, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

interface Props {
  label: string;
  onClick: () => void;
}

const NodeButton = ({ label, onClick }: Props) => {
  return (
    <>
      <IconButton onClick={onClick} style={{ marginRight: "16px" }}>
        <CircleIcon fontSize="large" />
        <Typography variant="caption" display="block" gutterBottom>
          {label}
        </Typography>
      </IconButton>
    </>
  );
};

export default NodeButton;
