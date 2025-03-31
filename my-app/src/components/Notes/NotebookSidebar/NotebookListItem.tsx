// src/components/NotebookSidebar/NotebookListItem.tsx
import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Notebook } from "../../../types/notes";
import { useContext, useState } from "react";
import { useData } from "../../../data/DataContext";
import { NotebookContext } from "../NotebookContext";
import { logger } from "@/utils/logger";

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
  const { selectedNotebook } = useContext(NotebookContext);

  const [isDragOver, setIsDragOver] = useState(false);
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const isInSafeZone =
      event.clientY > rect.top + 5 && event.clientY < rect.bottom - 5;
    setIsDragOver(isInSafeZone);
  };
  const handleDragLeave = (event: React.DragEvent) => {
    // 精确判断是否真正离开当前元素
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!event.currentTarget.contains(relatedTarget)) {
      setIsDragOver(false);
    }
  };
  const handleDrop = async (event: React.DragEvent) => {
    setIsDragOver(false);
    const noteId = event.dataTransfer.getData("note/id");
    const notebookId = notebook.id;
    if (noteId) {
      await notes.moveToNotebook(noteId, notebookId);
      if (selectedNotebook) {
        notes.refresh();
      }
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
        "&:hover:not(.Mui-selected)": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          "& .MuiListItemSecondaryAction-root": {
            opacity: 0.8,
          },
        },
        "& .MuiListItemSecondaryAction-root": {
          transition: "opacity 0.2s",
          opacity: selected ? 1 : 0.6,
        },
      }}
      disablePadding
      secondaryAction={
        <IconButton edge="end" onClick={onDelete} disabled={loading}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      }
    >
      <ListItemButton
        selected={selected}
        onClick={onSelect}
        sx={{
          pr: 6, // 给右侧按钮留出空间
          "&.Mui-selected": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.12)",
            },
          },
        }}
      >
        <ListItemText
          primary={notebook.name}
          secondary={isDragOver ? "松开以移动笔记到此笔记本" : undefined}
          slotProps={{
            primary: {
              fontWeight: selected ? 600 : 400,
              noWrap: true,
              sx: {
                fontSize: "0.95rem",
                lineHeight: 1.25,
                letterSpacing: "0.02em",
              },
            },
            secondary: {
              color: "primary.main",
              fontSize: "0.75rem",
              lineHeight: 1.2,
              position: "absolute",
              right: 48,
              top: "50%",
            },
          }}
          sx={{
            "& .MuiTypography-root": {
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NotebookListItem;
