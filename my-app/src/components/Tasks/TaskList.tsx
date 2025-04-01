import { useState } from "react";
import { Task } from "../../types/tasks";
import GenericList from "../Lists/GenericList";
import TaskItem from "./TaskList/TaskItem";
import EditTaskDialog from "./TaskForm/EditTaskDialog";
import TaskFilterBar from "./TaskFilterBar";

interface TaskListProps {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}

const TaskList = ({
  tasks,
  onUpdate,
  onDelete,
  onStatusChange,
}: TaskListProps) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdate = (updatedTask: Task) => {
    onUpdate(updatedTask);
    setEditingTask(null);
  };

  const handleClose = () => {
    setEditingTask(null);
  };

  const handleFilterChange = (filters: {
    status?: string;
    priority?: string;
  }) => {
    // 根据filters过滤tasks
    const filteredTasks = tasks.filter((task) => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;

      return true;
    });
    //setTasks(filteredTasks);
  };

  return (
    <>
      <TaskFilterBar onFilterChange={handleFilterChange} />
      <GenericList<Task>
        items={tasks}
        keyExtractor={(task) => task.id}
        emptyMessage="没有可用任务"
        renderItem={(task) => (
          <TaskItem
            task={task}
            onEdit={handleEditClick}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        )}
      />
      {editingTask && (
        <EditTaskDialog
          open={!!editingTask}
          task={editingTask}
          onUpdateTask={handleUpdate}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default TaskList;
