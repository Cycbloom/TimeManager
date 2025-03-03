// src/components/NotebookSidebar.tsx
import { useContext, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Alert,
  IconButton,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { NoteFilterContext } from "./NoteFilterContext";
import useNotebooks from "../../hooks/useNotebooks";

const NotebookSidebar = () => {
  const { selectedNotebook, setSelectedNotebook } =
    useContext(NoteFilterContext);
  const [newNotebookName, setNewNotebookName] = useState("");

  // 获取笔记本列表
  const {
    notebooks,
    loading,
    error,
    actions: { createNotebook, deleteNotebook, refreshNotebooks },
  } = useNotebooks();

  // 处理新建笔记本
  const handleCreate = () => {
    if (!newNotebookName.trim()) return;
    createNotebook({ id: 0, name: newNotebookName });
    setNewNotebookName("");
    refreshNotebooks(); // 确保立即刷新列表
  };

  const handleDelete = (id: number) => {
    if (window.confirm("删除笔记本会同时删除其中所有笔记，确定继续吗？")) {
      deleteNotebook(id);
      // 如果删除的是当前选中笔记本，重置选择
      if (selectedNotebook === id) setSelectedNotebook(null);
    }
  };

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      {/* 新建笔记本区域 */}
      <Box p={2}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="新建笔记本"
          value={newNotebookName}
          onChange={(e) => setNewNotebookName(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleCreate}
                    disabled={!newNotebookName || loading}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      {/* 加载状态指示 */}
      {loading && (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress size={24} />
        </Box>
      )}
      {/* 笔记本列表 */}
      <List dense>
        <ListItem disablePadding>
          <ListItemButton
            selected={!selectedNotebook}
            onClick={() => setSelectedNotebook(null)}
          >
            <ListItemText
              primary="全部笔记"
              slotProps={{
                primary: {
                  fontWeight: selectedNotebook ? "normal" : "bold",
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        {notebooks?.map((notebook) => (
          <ListItem
            key={notebook.id}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => handleDelete(notebook.id)}
                disabled={loading}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            }
          >
            <ListItemButton
              selected={selectedNotebook === notebook.id}
              onClick={() => setSelectedNotebook(notebook.id)}
            >
              <ListItemText
                primary={notebook.name}
                slotProps={{
                  primary: {
                    fontWeight:
                      selectedNotebook === notebook.id ? "bold" : "normal",
                    noWrap: true,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NotebookSidebar;
