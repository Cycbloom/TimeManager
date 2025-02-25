import { Container, Typography } from "@mui/material";
import useNote from "../../hooks/useNote";

export interface NoteQuery {
  content: string;
}

import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

const NotePage = () => {
  const {
    data: notesData,
    error: noteError,
    postData: addNote,
    deleteData: deleteNote,
  } = useNote();
  return (
    <Container>
      <NoteForm onAddNote={addNote} />
      {noteError && <Typography color="error">{noteError}</Typography>}
      <NoteList notes={notesData} onDelete={deleteNote} />
    </Container>
  );
};

export default NotePage;
