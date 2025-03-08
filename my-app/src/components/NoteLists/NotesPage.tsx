// src/components/NoteLists/NotePage.tsx
import { Container, Grid2 as Grid, Typography } from "@mui/material";

import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { NoteFilterContext } from "./NoteFilterContext";
import { NoteQuery, Tag } from "../../types/notes";
import { useContext, useEffect } from "react";
import NotebookSidebar from "./NotebookSidebar";
import { useData } from "../../data/DataContext";

const NotePage = () => {
  const { selectedType, selectedTags, selectedNotebook } =
    useContext(NoteFilterContext);

  const noteQuery: NoteQuery = {
    queryType: selectedType,
    queryTags: selectedTags.map((tag: Tag) => tag.id),
    queryNotebook: selectedNotebook,
  };

  const { notes } = useData();

  useEffect(() => {
    notes.fetch(noteQuery);
  }, [selectedType, selectedTags, selectedNotebook]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid size="auto">
          <NotebookSidebar />
        </Grid>
        <Grid size={9}>
          <NoteForm onAddNote={notes.create} />
          {notes.loading && <Typography>Loading...</Typography>}
          {notes.error && <Typography color="error">{notes.error}</Typography>}
          <NoteList
            notes={notes.data}
            onDelete={notes.delete}
            onUpdate={notes.update}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotePage;
