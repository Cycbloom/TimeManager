import { useData } from "../../data/DataContext";
import { Task, TaskFormData } from "../../types/tasks";
import BaseTaskForm from "./TaskForm/BaseTaskForm";
import TaskList from "./TaskList";
import { Box } from "@mui/material";

const TaskPageContent = () => {
  const { tasks } = useData();

  const handleCreate = async (data: TaskFormData) => {
    const newTask: Task = {
      ...data,
      id: 0,
      status: "created",
      bufferTime: 0,
    };
    tasks.create(newTask);
  };

  const handleUpdate = async (task: Task) => {
    tasks.update(task);
  };

  const handleDelete = async (taskId: number) => {
    tasks.delete(taskId);
  };

  const handleStatusChange = async (
    taskId: number,
    newStatus: Task["status"]
  ) => {
    tasks.updateStatus(taskId, newStatus);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <BaseTaskForm
        formTitle="创建任务"
        submitButtonText="创建任务"
        onSubmit={handleCreate}
      />
      <TaskList
        tasks={tasks.data}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </Box>
  );
};

export default TaskPageContent;
