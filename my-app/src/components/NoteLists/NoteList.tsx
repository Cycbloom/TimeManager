import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Note } from "../../hooks/useNote";

interface Props {
  notes: Note[];
  onEdit: (noteId: number) => void;
  onDelete: (noteId: number) => void;
}

const NoteList = ({ notes, onDelete }: Props) => {
  if (notes.length === 0) {
    return <Typography>No notes available.</Typography>;
  }

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {notes.map((note, index) => (
        <div key={note.id}>
          <ListItem
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => console.log("Update note:", note.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(note.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={note.title} secondary={note.content} />
          </ListItem>
          {index < notes.length - 1 && <Divider component="li" />}
        </div>
      ))}
    </List>
  );
};

export default NoteList;
