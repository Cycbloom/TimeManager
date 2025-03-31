// src/components/NoteLists/NotebookSidebar/NotebookSidebar.tsx
import { useContext, useEffect } from "react";
import { Box, Alert, CircularProgress } from "@mui/material";
import { NotebookContext } from "../NotebookContext";
import NewNotebookInput from "./NewNotebookInput";
import NotebookList from "./NotebookList";
import { useData } from "../../../data/DataContext";

const NotebookSidebar = () => {
  const { selectedNotebook, setSelectedNotebook } = useContext(NotebookContext);

  const { notebooks } = useData();

  useEffect(() => {
    notebooks.fetch();
  }, []);

  // 新增删除处理逻辑
  const handleDeleteNotebook = (id: number) => {
    if (window.confirm("删除笔记本会同时删除其中所有笔记，确定继续吗？")) {
      notebooks.delete(id);
      if (selectedNotebook === id) setSelectedNotebook(null);
    }
  };

  if (notebooks.error) return <Alert severity="error">{notebooks.error}</Alert>;

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <NewNotebookInput
        onCreate={notebooks.create}
        loading={notebooks.loading}
      />

      {notebooks.loading && (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress size={24} />
        </Box>
      )}

      <NotebookList
        notebooks={notebooks.data}
        selectedNotebook={selectedNotebook}
        onSelectNotebook={setSelectedNotebook}
        onDeleteNotebook={handleDeleteNotebook}
        loading={notebooks.loading}
      />
    </Box>
  );
};

export default NotebookSidebar;
