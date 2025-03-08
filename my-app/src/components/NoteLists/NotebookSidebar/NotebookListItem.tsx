// src/components/NotebookSidebar/NotebookListItem.tsx
import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Notebook } from "../../../types/notes";
import { useState } from "react";
import { useData } from "../../../data/DataContext";

interface NotebookListItemProps {
  notebook: Notebook;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  loading: boolean;
}

const NotebookListItem = ({
  notebook,
  selected,
  onSelect,
  onDelete,
  loading,
}: NotebookListItemProps) => {
  const { notes } = useData();

  const [isDragOver, setIsDragOver] = useState(false);
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (_event: React.DragEvent) => {
    setIsDragOver(false);
  };
  const handleDrop = (event: React.DragEvent) => {
    setIsDragOver(false);
    const noteId = parseInt(event.dataTransfer.getData("note/id"));
    const notebookId = notebook.id;
    if (!isNaN(noteId)) {
      notes.moveToNotebook(noteId, notebookId);
    }
  };

  return (
    <ListItem
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        bgcolor: isDragOver ? "action.hover" : "inherit",
        transition: "background-color 0.3s",
      }}
      disablePadding
      secondaryAction={
        <IconButton edge="end" onClick={onDelete} disabled={loading}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      }
    >
      <ListItemButton selected={selected} onClick={onSelect}>
        <ListItemText
          primary={notebook.name}
          slotProps={{
            primary: {
              fontWeight: selected ? "bold" : "normal",
              noWrap: true,
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NotebookListItem;
