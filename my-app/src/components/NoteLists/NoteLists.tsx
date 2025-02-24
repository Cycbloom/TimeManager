import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import useNote from "../../hooks/useNote";

export interface NoteQuery {
  content: string;
}

import { Note } from "../../hooks/useNote";

const voidNote: Note = {
  id: 0,
  title: "",
  content: "",
};

const NoteLists = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>(voidNote);
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
  const handleAddNote = () => {
    axios
      .post("http://localhost:5000/api/notes", { content: newNote })
      .then((response) => {
        setNotes([...notes, response.data]);
        setNewNote(voidNote);
      })
      .catch((error) => {
        setError("Error adding note: " + error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Notes
      </Typography>
      <TextField
        label="New Note Title"
        variant="outlined"
        fullWidth
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="New Note"
        variant="outlined"
        fullWidth
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNote}
        style={{ marginTop: "10px" }}
      >
        Add Note
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {notes.map((note, index) => (
          <>
            <ListItem key={index}>
              <ListItemText
                primary={note.title}
                secondary={note.content}
              ></ListItemText>
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
    </Container>
  );
};

export default NoteLists;
