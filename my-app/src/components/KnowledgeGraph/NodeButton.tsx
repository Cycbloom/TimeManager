import { Button } from "@mui/material";

interface Props {
  label: string;
  onClick: () => void;
}

const NodeButton = ({ label, onClick }: Props) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {label}
    </Button>
  );
};

export default NodeButton;
