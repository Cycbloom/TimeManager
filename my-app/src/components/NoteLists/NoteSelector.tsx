import { Paper } from "@mui/material";
import TypeSelector from "./TypeSelector";
import LabelSelector from "./TagSelector";

const NoteSelector = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        maxWidth: 600,
        backgroundColor: "#f9f9f9",
        display: "flex",
        gap: 2,
        alignItems: "center",
      }}
    >
      <TypeSelector />
      <LabelSelector />
    </Paper>
  );
};

export default NoteSelector;
