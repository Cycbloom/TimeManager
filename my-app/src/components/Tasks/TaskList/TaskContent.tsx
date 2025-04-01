import { Box, Typography, Chip } from "@mui/material";
import { Task } from "@/types/tasks";
import { format } from "date-fns";

interface TaskContentProps {
  task: Task;
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

const TaskContent = ({ task }: TaskContentProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="subtitle1" component="div">
          {task.title}
        </Typography>
        <Chip
          size="small"
          label={task.priority}
          color={getPriorityColor(task.priority)}
        />
        <Chip size="small" label={task.status} variant="outlined" />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" color="text.secondary" component="div">
          {task.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          截止日期: {format(new Date(task.dueDate), "yyyy-MM-dd")}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          预计时间: {task.estimatedHours}小时
        </Typography>
      </Box>
      {task.tags.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
          {task.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TaskContent;
