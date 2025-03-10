import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Task, TaskFormData } from "../../../types/tasks";
import BaseTaskForm from "./BaseTaskForm";

interface EditTaskDialogProps {
  open: boolean;
  task: Task;
  onUpdateTask: (task: Task) => void;
  onClose: () => void;
}

const EditTaskDialog = ({
  open,
  task,
  onUpdateTask,
  onClose,
}: EditTaskDialogProps) => {
  const handleSubmit = (data: TaskFormData) => {
    const updatedTask: Task = {
      ...task,
      ...data,
    };
    onUpdateTask(updatedTask);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>编辑任务</DialogTitle>
      <DialogContent>
        <BaseTaskForm
          formTitle=""
          submitButtonText="更新任务"
          onSubmit={handleSubmit}
          defaultValues={task}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
