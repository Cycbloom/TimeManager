import { useState } from "react";
import { Task } from "../../types/tasks";
import GenericList from "../common/GenericList";
import TaskItem from "./TaskItem";
import EditTaskDialog from "./TaskForm/EditTaskDialog";
import TaskFilterBar from "./TaskFilterBar";

interface TaskListProps {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onStatusChange: (taskId: number, newStatus: Task["status"]) => void;
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

  return (
    <>
      <GenericList
        items={tasks}
        keyExtractor={(task) => task.id}
        header={<TaskFilterBar />}
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
