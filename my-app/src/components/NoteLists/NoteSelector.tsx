import { Paper } from "@mui/material";
import TypeSelector from "./TypeSelector";
import LabelSelector from "./TagSelector";

const NoteSelector = () => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: 3, maxWidth: 300, backgroundColor: "#f9f9f9" }}
    >
      <TypeSelector />
      <LabelSelector />
    </Paper>
  );
};

export default NoteSelector;
