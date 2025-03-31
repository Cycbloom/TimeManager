// src/components/NoteLists/NotebookSidebar/NewNotebookInput.tsx
import { useState } from "react";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface NewNotebookInputProps {
  onCreate: (notebook: { id: number; name: string }) => void;
  loading: boolean;
}

const NewNotebookInput = ({ onCreate, loading }: NewNotebookInputProps) => {
  const [newNotebookName, setNewNotebookName] = useState("");

  const handleCreate = () => {
    if (!newNotebookName.trim()) return;
    onCreate({ id: 0, name: newNotebookName });
    setNewNotebookName("");
  };

  return (
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
  );
};

export default NewNotebookInput;
