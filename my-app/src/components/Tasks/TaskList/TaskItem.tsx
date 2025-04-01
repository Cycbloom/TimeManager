import { Chip, Box, Tooltip, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseIcon from "@mui/icons-material/Pause";
import { Task } from "@/types/tasks";
import { format } from "date-fns";
import BaseItem from "@/components/Lists/BaseItem";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
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

  const primaryContent = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {task.title}
      <Chip
        size="small"
        label={task.priority}
        color={getPriorityColor(task.priority)}
      />
      <Chip size="small" label={task.status} variant="outlined" />
    </Box>
  );

  const secondaryContent = (
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
  );

  return (
    <BaseItem
      item={task}
      itemId={task.id}
      onEdit={onEdit}
      onDelete={onDelete}
      primaryContent={primaryContent}
      secondaryContent={secondaryContent}
      extraActions={renderStatusActions()}
      dataType="task"
    />
  );
};

export default TaskItem;
