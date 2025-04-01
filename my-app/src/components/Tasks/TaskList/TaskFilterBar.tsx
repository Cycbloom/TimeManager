import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { priorityOptions } from "@/types/tasks";

interface TaskFilterBarProps {
  onFilterChange?: (filters: { status?: string; priority?: string }) => void;
}

const TaskFilterBar = ({ onFilterChange }: TaskFilterBarProps) => {
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const handleStatusChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    if (onFilterChange) {
      onFilterChange({ status: newStatus || undefined, priority });
    }
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    const newPriority = event.target.value;
    setPriority(newPriority);
    if (onFilterChange) {
      onFilterChange({ status, priority: newPriority || undefined });
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="status-filter-label">状态</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={status}
          onChange={handleStatusChange}
          label="状态"
        >
          <MenuItem value="">
            <em>全部</em>
          </MenuItem>
          <MenuItem value="created">已创建</MenuItem>
          <MenuItem value="ready">就绪</MenuItem>
          <MenuItem value="executing">执行中</MenuItem>
          <MenuItem value="completed">已完成</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="priority-filter-label">优先级</InputLabel>
        <Select
          labelId="priority-filter-label"
          id="priority-filter"
          value={priority}
          onChange={handlePriorityChange}
          label="优先级"
        >
          <MenuItem value="">
            <em>全部</em>
          </MenuItem>
          {priorityOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TaskFilterBar;
