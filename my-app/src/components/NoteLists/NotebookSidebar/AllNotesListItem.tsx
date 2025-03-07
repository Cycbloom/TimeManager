// src/components/NoteLists/NotebookSidebar/AllNotesListItem.tsx
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

interface AllNotesListItemProps {
  selected: boolean;
  onSelect: () => void;
}

const AllNotesListItem = ({ selected, onSelect }: AllNotesListItemProps) => {
  return (
    <ListItem disablePadding>
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
