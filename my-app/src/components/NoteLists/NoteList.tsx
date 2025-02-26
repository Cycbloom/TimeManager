import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Dialog,
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
        <Dialog open={!!editingNote} onClose={handleClose}>
          <EditNoteForm
            note={editingNote}
            onUpdateNote={handleUpdate}
            onClose={handleClose}
          />
        </Dialog>
      )}
    </>
  );
};

export default NoteList;
