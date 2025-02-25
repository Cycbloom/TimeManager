import { Container, Typography } from "@mui/material";
import useNote from "../../hooks/useNote";

export interface NoteQuery {
  content: string;
}

import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

const NotePage = () => {
  const { data: notesData, error: noteError, postData: addNote } = useNote();
  return (
    <Container>
      <NoteForm onAddNote={addNote} />
      {noteError && <Typography color="error">{noteError}</Typography>}
      <NoteList notes={notesData} />
    </Container>
  );
};

export default NotePage;
