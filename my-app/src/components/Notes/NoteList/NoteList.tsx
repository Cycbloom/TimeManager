//src/components/NoteLists/NoteList.tsx
import { useState } from "react";
import { Note, NoteQuery, NoteType, Tag } from "@/types/notes";
import NoteItem from "./NoteItem";
import { EditNoteDialog } from "@/components/Notes/NoteForms";
import NoteSelector, { NoteFilterFormData } from "./NoteSelector";
import { useData } from "@/data/DataContext";
import GenericList from "@/components/Lists/GenericList";

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
      tags: filters.tags.map((tag: Tag) => tag.name),
      notebook_id: filters.notebookId,
    };

    notes.fetch(noteQuery);
  };

  return (
    <>
      <NoteSelector onFilterChange={handleFilterChange} />
      <GenericList
        items={notes.data}
        renderItem={(note: Note) => (
          <NoteItem
            note={note}
            onEdit={handleEditClick}
            onDelete={notes.delete}
          />
        )}
        keyExtractor={(note: Note) => note.id}
        emptyMessage="没有可用的笔记"
      />
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
