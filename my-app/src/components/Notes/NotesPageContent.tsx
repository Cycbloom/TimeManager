// src/components/NoteLists/NotesPageContent.tsx
import { Container, Grid2 as Grid, Typography } from "@mui/material";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import NotebookSidebar from "./NotebookSidebar";
import { useData } from "@/data/DataContext";

const NotesPageContent = () => {
  const { notes } = useData();

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
          <NoteList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotesPageContent;
