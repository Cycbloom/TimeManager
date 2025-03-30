//src/components/NoteLists/NoteList.tsx
import { List, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { Note, NoteQuery, NoteType, Tag } from "../../types/notes";
import NoteItem from "./NoteItem";
import EditNoteDialog from "./EditNoteDialog";
import NoteSelector, { NoteFilterFormData } from "./NoteSelector";
import { useData } from "@/data/DataContext";

const NoteList = () => {
  const { notes } = useData();

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleEditClick = (note: Note) => {
    setEditingNote(note);
  };

  const handleUpdate = (updatedNote: Note) => {
    notes.update(updatedNote.id, updatedNote);
    setEditingNote(null);
  };

  const handleClose = () => {
    setEditingNote(null);
  };

  const handleFilterChange = (
    filters: NoteFilterFormData & { notebookId: number | null }
  ) => {
    const noteQuery: NoteQuery = {
      type: filters.type as NoteType,
      tags: filters.tags.map((tag: Tag) => tag.id),
      notebook_id: filters.notebookId,
    };

    notes.fetch(noteQuery);
  };

  return (
    <>
      <NoteSelector onFilterChange={handleFilterChange} />
      {notes.data.length > 0 ? (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {notes.data.map((note, index) => (
            <div key={note.id}>
              <NoteItem
                note={note}
                onEdit={handleEditClick}
                onDelete={notes.delete}
              />
              {index < notes.data.length - 1 && <Divider component="li" />}
            </div>
          ))}
        </List>
      ) : (
        <Typography>No notes available.</Typography>
      )}
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
