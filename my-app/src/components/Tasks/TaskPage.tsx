import { TaskFormData } from "../../types/tasks";
import BaseTaskForm from "./TaskForm/BaseTaskForm";

const TaskPage = () => {
  const onSubmit = (data: TaskFormData) => {
    console.log(data);
  };

  return (
    <BaseTaskForm
      formTitle="创建任务"
      submitButtonText="创建任务"
      onSubmit={onSubmit}
    />
  );
};

export default TaskPage;
