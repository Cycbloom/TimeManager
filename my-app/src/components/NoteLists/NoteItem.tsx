import { ListItem, ListItemText, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Note } from "../../types/notes";

interface Props {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: number) => void;
}

const NoteItem = ({ note, onEdit, onDelete }: Props) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit" onClick={() => onEdit(note)}>
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
  );
};

export default NoteItem;
