import { Dialog, Box } from "@mui/material";
import EditNoteForm from "./EditNoteForm";
import { Note } from "../../hooks/useNote";

interface Props {
  open: boolean;
  note: Note;
  onUpdateNote: (note: Note) => void;
  onClose: () => void;
}

const EditNoteDialog = ({ open, note, onUpdateNote, onClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Box sx={{ margin: "0.5rem 1rem" }}>
        <EditNoteForm
          note={note}
          onUpdateNote={onUpdateNote}
          onClose={onClose}
        />
      </Box>
    </Dialog>
  );
};

export default EditNoteDialog;
