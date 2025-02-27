import { Container, Typography } from "@mui/material";
import useNote from "../../hooks/useNote";

import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { NoteFilterContext, Tag } from "./NoteFilterContext";
import { NoteType } from "./BaseNoteForm";
import { useContext } from "react";

export interface NoteQuery {
  queryType: NoteType | null;
  queryTags: number[];
}

const NotePage = () => {
  const { selectedType, selectedTags } = useContext(NoteFilterContext);

  const noteQuery: NoteQuery = {
    queryType: selectedType,
    queryTags: selectedTags.map((tag: Tag) => tag.id),
  };

  const {
    data: notesData,
    error: noteError,
    postData: addNote,
    deleteData: deleteNote,
    updateData: updateNote,
    loading,
  } = useNote(noteQuery);

  return (
    <Container>
      <NoteForm onAddNote={addNote} />
      {loading && <Typography>Loading...</Typography>}
      {noteError && <Typography color="error">{noteError}</Typography>}
      <NoteList notes={notesData} onDelete={deleteNote} onUpdate={updateNote} />
    </Container>
  );
};

export default NotePage;
