import { Container, Grid2 as Grid, Typography } from "@mui/material";
import useNote from "../../hooks/useNote";

import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { NoteFilterContext, Tag } from "./NoteFilterContext";
import { NoteType } from "./BaseNoteForm";
import { useContext } from "react";
import NotebookSidebar from "./NotebookSidebar";

export interface NoteQuery {
  queryType: NoteType | null;
  queryTags: number[];
  queryNotebook: number | null;
}

const NotePage = () => {
  const { selectedType, selectedTags, selectedNotebook } =
    useContext(NoteFilterContext);

  const noteQuery: NoteQuery = {
    queryType: selectedType,
    queryTags: selectedTags.map((tag: Tag) => tag.id),
    queryNotebook: selectedNotebook,
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
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid size="auto">
          <NotebookSidebar />
        </Grid>
        <Grid size={9}>
          <NoteForm onAddNote={addNote} />
          {loading && <Typography>Loading...</Typography>}
          {noteError && <Typography color="error">{noteError}</Typography>}
          <NoteList
            notes={notesData}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotePage;
