import { Tooltip, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseIcon from "@mui/icons-material/Pause";
import { Task } from "@/types/tasks";
import BaseItem from "@/components/Lists/BaseItem";
import TaskContent from "./TaskContent";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}

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

  return (
    <BaseItem
      item={task}
      itemId={task.id}
      onEdit={onEdit}
      onDelete={onDelete}
      primaryContent={<TaskContent task={task} />}
      extraActions={renderStatusActions()}
      dataType="task"
    />
  );
};

export default TaskItem;
