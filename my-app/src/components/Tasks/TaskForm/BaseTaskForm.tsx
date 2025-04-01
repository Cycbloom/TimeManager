import { SubmitHandler } from "react-hook-form";
import { TaskFormData, taskFormSchema } from "@/types/tasks";
import { Box } from "@mui/material";
import {
  DatePickerField,
  PrioritySelect,
  FormInput,
  TagInput,
  EstimateSlider,
} from "@/components/form-controls";
import BaseForm from "@/components/forms/BaseForm";

interface Props {
  onSubmit: SubmitHandler<TaskFormData>;
  defaultValues?: Partial<TaskFormData>;
  submitButtonText: string;
  formTitle: string;
}

const BaseTaskForm = ({
  onSubmit,
  defaultValues = {
    title: "",
    description: "",
    dueDate: new Date(),
    priority: "low",
    tags: [],
    estimatedHours: 1,
  },
  submitButtonText,
  formTitle,
}: Props) => (
  <BaseForm<TaskFormData>
    onSubmit={onSubmit}
    defaultValues={defaultValues}
    submitButtonText={submitButtonText}
    formTitle={formTitle}
    schema={taskFormSchema}
  >
    <FormInput name="title" label="任务标题" />
    <FormInput name="description" label="任务描述" multiline />
    <Box display="flex" gap={3} mt={2}>
      <Box flex={1}>
        <DatePickerField name="dueDate" label="截止日期" />
      </Box>
      <Box flex={1}>
        <PrioritySelect name="priority" label="优先级" />
      </Box>
    </Box>
    <EstimateSlider
      name="estimatedHours"
      label="工作量预估"
      max={40}
      step={0.5}
    />
    <TagInput name="tags" label="标签" />
  </BaseForm>
);

export default BaseTaskForm;
