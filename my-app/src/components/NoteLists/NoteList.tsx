import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { Note } from "../../hooks/useNote";

interface Props {
  notes: Note[];
}

const NoteList = ({ notes }: Props) => {
  if (notes.length === 0) {
    return <Typography>No notes available.</Typography>;
  }

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {notes.map((note, index) => (
        <div key={note.id}>
          <ListItem>
            <ListItemText primary={note.title} secondary={note.content} />
          </ListItem>
          {index < notes.length - 1 && <Divider component="li" />}
        </div>
      ))}
    </List>
  );
};

export default NoteList;
