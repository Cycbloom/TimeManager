// src/components/NoteLists/NotebookSidebar/NotebookSidebar.tsx
import { useContext } from "react";
import { Box, Alert, CircularProgress } from "@mui/material";
import { NoteFilterContext } from "../NoteFilterContext";
import useNotebooks from "../../../hooks/useNotebooks";
import NewNotebookInput from "./NewNotebookInput";
import NotebookList from "./NotebookList";

const NotebookSidebar = () => {
  const { selectedNotebook, setSelectedNotebook } =
    useContext(NoteFilterContext);

  const {
    notebooks,
    loading,
    error,
    actions: { createNotebook, deleteNotebook },
  } = useNotebooks();

  // 新增删除处理逻辑
  const handleDeleteNotebook = (id: number) => {
    if (window.confirm("删除笔记本会同时删除其中所有笔记，确定继续吗？")) {
      deleteNotebook(id);
      if (selectedNotebook === id) setSelectedNotebook(null);
    }
  };

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <NewNotebookInput onCreate={createNotebook} loading={loading} />

      {loading && (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress size={24} />
        </Box>
      )}

      <NotebookList
        notebooks={notebooks}
        selectedNotebook={selectedNotebook}
        onSelectNotebook={setSelectedNotebook}
        onDeleteNotebook={handleDeleteNotebook}
        loading={loading}
      />
    </Box>
  );
};

export default NotebookSidebar;
