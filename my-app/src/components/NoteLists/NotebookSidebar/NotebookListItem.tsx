// src/components/NotebookSidebar/NotebookListItem.tsx
import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Notebook } from "../../../types/notes";

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
  return (
    <ListItem
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
