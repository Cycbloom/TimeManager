import { ListItem, ListItemText, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactNode } from "react";

export interface BaseItemProps<T> {
  item: T;
  itemId: string;
  onEdit: (item: T) => void;
  onDelete: (itemId: string) => void;
  primaryContent: ReactNode;
  secondaryContent?: ReactNode;
  extraActions?: ReactNode;
  dataType?: string;
}

function BaseItem<T>({
  item,
  itemId,
  onEdit,
  onDelete,
  primaryContent,
  secondaryContent,
  extraActions,
  dataType = "item",
}: BaseItemProps<T>) {
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData(`${dataType}/id`, itemId);
    event.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (event: React.DragEvent) => {
    event.currentTarget.classList.remove("dragging");
  };

  return (
    <ListItem
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      secondaryAction={
        <Box sx={{ display: "flex", gap: 1 }}>
          {extraActions}
          <IconButton edge="end" aria-label="edit" onClick={() => onEdit(item)}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(itemId)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      }
    >
      <ListItemText primary={primaryContent} secondary={secondaryContent} />
    </ListItem>
  );
}

export default BaseItem;
