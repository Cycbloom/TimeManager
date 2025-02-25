import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import useNote from "../../hooks/useNote";

export interface NoteQuery {
  content: string;
}

import { Note } from "../../hooks/useNote";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

const NotePage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");
  const { data: notesData, error: noteError } = useNote();

  // 从后端获取笔记
  useEffect(() => {
    if (notesData) {
      setNotes(notesData);
    }
    if (noteError) {
      setError(noteError);
    }
  }, [notesData]); //TODO：修改依赖项

  // 添加新笔记
  const handleAddNote = (newNote: Note) => {
    axios
      .post("http://localhost:5000/api/notes", { content: newNote })
      .then((response) => {
        setNotes([...notes, response.data]);
      })
      .catch((error) => {
        setError("Error adding note: " + error);
      });
  };

  return (
    <Container>
      <NoteForm onAddNote={handleAddNote} />
      {error && <Typography color="error">{error}</Typography>}
      <NoteList notes={notes} />
    </Container>
  );
};

export default NotePage;
