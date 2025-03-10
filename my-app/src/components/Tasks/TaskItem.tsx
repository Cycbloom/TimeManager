import {
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Box,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseIcon from "@mui/icons-material/Pause";
import { Task } from "../../types/tasks";
import { format } from "date-fns";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onStatusChange: (taskId: number, newStatus: Task["status"]) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "default";
  }
};

const TaskItem = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskItemProps) => {
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("task/id", task.id.toString());
    event.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (event: React.DragEvent) => {
    event.currentTarget.classList.remove("dragging");
  };

  const renderStatusActions = () => {
    switch (task.status) {
      case "created":
      case "ready":
        return (
          <Tooltip title="开始执行">
            <IconButton
              color="primary"
              onClick={() => onStatusChange(task.id, "executing")}
            >
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
        );
      case "executing":
        return (
          <>
            <Tooltip title="暂停任务">
              <IconButton
                color="warning"
                onClick={() => onStatusChange(task.id, "ready")}
              >
                <PauseIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="完成任务">
              <IconButton
                color="success"
                onClick={() => onStatusChange(task.id, "completed")}
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      case "completed":
        return null;
    }
  };

  return (
    <ListItem
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      secondaryAction={
        <Box sx={{ display: "flex", gap: 1 }}>
          {renderStatusActions()}
          <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(task.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      }
    >
      <ListItemText
        primary={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {task.title}
            <Chip
              size="small"
              label={task.priority}
              color={getPriorityColor(task.priority)}
            />
            <Chip size="small" label={task.status} variant="outlined" />
          </Box>
        }
        secondary={
          <Box>
            <div>{task.description}</div>
            <div>截止日期: {format(new Date(task.dueDate), "yyyy-MM-dd")}</div>
            <div>预计时间: {task.estimatedHours}小时</div>
            {task.tags.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                {task.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Box>
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

export default TaskItem;
