import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Dialog,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Note } from "../../hooks/useNote";
import { useState } from "react";
import EditNoteForm from "./EditNoteDialog";

interface Props {
  notes: Note[];
  onUpdate: (note: Note) => void;
  onDelete: (noteId: number) => void;
}

const NoteList = ({ notes, onDelete, onUpdate }: Props) => {
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleEditClick = (note: Note) => {
    setEditingNote(note);
  };

  const handleUpdate = (updatedNote: Note) => {
    onUpdate(updatedNote);
    setEditingNote(null);
  };

  const handleClose = () => {
    setEditingNote(null);
  };

  if (notes.length === 0) {
    return <Typography>No notes available.</Typography>;
  }

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {notes.map((note, index) => (
          <div key={note.id}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditClick(note)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(note.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={note.title} secondary={note.content} />
            </ListItem>
            {index < notes.length - 1 && <Divider component="li" />}
          </div>
        ))}
      </List>
      {editingNote && (
        <Dialog
          open={!!editingNote}
          onClose={handleClose}
          maxWidth="sm" // 设置为中等宽度
          fullWidth // 使用全宽
          sx={{
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box sx={{ margin: "0.5rem 1rem" }}>
            <EditNoteForm
              note={editingNote}
              onUpdateNote={handleUpdate}
              onClose={handleClose}
            />
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default NoteList;
