// src/components/NoteLists/NotebookSidebar/NotebookList.tsx
import { List } from "@mui/material";
import { Notebook } from "../../../types/notes";
import AllNotesListItem from "./AllNotesListItem";
import NotebookListItem from "./NotebookListItem";

interface NotebookListProps {
  notebooks?: Notebook[];
  selectedNotebook: number | null;
  onSelectNotebook: (id: number | null) => void;
  onDeleteNotebook: (id: number) => void;
  loading: boolean;
}

const NotebookList = ({
  notebooks,
  selectedNotebook,
  onSelectNotebook,
  onDeleteNotebook,
  loading,
}: NotebookListProps) => {
  return (
    <List dense>
      <AllNotesListItem
        selected={!selectedNotebook}
        onSelect={() => onSelectNotebook(null)}
      />

      {notebooks?.map((notebook) => (
        <NotebookListItem
          key={notebook.id}
          notebook={notebook}
          selected={selectedNotebook === notebook.id}
          onSelect={() => onSelectNotebook(notebook.id)}
          onDelete={() => onDeleteNotebook(notebook.id)}
          loading={loading}
        />
      ))}
    </List>
  );
};

export default NotebookList;
