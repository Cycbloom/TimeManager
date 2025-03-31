// src/components/NoteLists/NotebookSidebar/AllNotesListItem.tsx
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useData } from "@/data/DataContext";

interface AllNotesListItemProps {
  selected: boolean;
  onSelect: () => void;
}

const AllNotesListItem = ({ selected, onSelect }: AllNotesListItemProps) => {
  const { notes } = useData();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const isInSafeZone =
      event.clientY > rect.top + 5 && event.clientY < rect.bottom - 5;
    setIsDragOver(isInSafeZone);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!event.currentTarget.contains(relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = async (event: React.DragEvent) => {
    setIsDragOver(false);
    const noteId = event.dataTransfer.getData("note/id");
    if (noteId) {
      await notes.moveToNotebook(noteId, null);
      notes.refresh();
    }
  };

  return (
    <ListItem
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        position: "relative",
        bgcolor: isDragOver ? "rgba(25, 118, 210, 0.1)" : "inherit",
        borderLeft: selected ? "3px solid #1976d2" : "none",
        border: isDragOver ? "2px dashed #1976d2" : "none",
        borderRadius: 1,
        overflow: "hidden",
        transition: (theme) =>
          theme.transitions.create(["all"], {
            duration: theme.transitions.duration.shortest,
          }),
      }}
      disablePadding
    >
      <ListItemButton selected={selected} onClick={onSelect}>
        <ListItemText
          primary="全部笔记"
          slotProps={{
            primary: {
              fontWeight: selected ? "bold" : "normal",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default AllNotesListItem;
