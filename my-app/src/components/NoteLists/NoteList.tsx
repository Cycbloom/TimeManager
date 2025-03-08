//src/components/NoteLists/NoteList.tsx
import { List, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { Note } from "../../types/notes";
import NoteItem from "./NoteItem";
import EditNoteDialog from "./EditNoteDialog";
import NoteSelector from "./NoteSelector";

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
    return (
      <>
        <NoteSelector />
        <Typography>No notes available.</Typography>
      </>
    );
  }

  return (
    <>
      <NoteSelector />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {notes.map((note, index) => (
          <div key={note.id}>
            <NoteItem
              note={note}
              onEdit={handleEditClick}
              onDelete={onDelete}
            />
            {index < notes.length - 1 && <Divider component="li" />}
          </div>
        ))}
      </List>
      {editingNote && (
        <EditNoteDialog
          open={!!editingNote}
          note={editingNote}
          onUpdateNote={handleUpdate}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default NoteList;
