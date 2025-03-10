import { useData } from "@/data/DataContext";
import { Task, TaskFormData } from "../../types/tasks";
import BaseTaskForm from "./TaskForm/BaseTaskForm";

const TaskPageContent = () => {
  const { tasks } = useData();

  const onSubmit = async (data: TaskFormData) => {
    const newTask: Task = {
      ...data,
      id: 0,
      status: "created",
      bufferTime: 0,
    };
    tasks.create(newTask);
  };

  return (
    <BaseTaskForm
      formTitle="创建任务"
      submitButtonText="创建任务"
      onSubmit={onSubmit}
    />
  );
};

export default TaskPageContent;
