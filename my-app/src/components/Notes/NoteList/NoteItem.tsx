// src/components/NoteLists/NoteItem.tsx
import { ListItem, ListItemText, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Note } from "@/types/notes";

interface Props {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

const NoteItem = ({ note, onEdit, onDelete }: Props) => {
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("note/id", note.id);
    event.currentTarget.classList.add("dragging");
  };
  const handleDragEnd = (event: React.DragEvent) => {
    event.currentTarget.classList.remove("draging");
  };

  return (
    <ListItem
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
