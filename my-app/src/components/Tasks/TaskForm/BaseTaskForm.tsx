import { SubmitHandler } from "react-hook-form";
import { TaskFormData, taskFormSchema } from "../../../types/tasks";
import { Button, Typography } from "@mui/material";
import { DatePickerField } from "../../forms/DatePickerField";
import { PrioritySelect } from "../../forms/PrioritySelect";
import { FormProviderWrapper } from "../../forms/FromPrividerWrapper";
import { FormInput } from "../../forms/FromInput";
import { TagInput } from "../../forms/TagInput";

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
    dueDate: new Date(),
    priority: "low",
    tags: [],
    estimatedHours: 1,
  },
  submitButtonText,
  formTitle,
}: Props) => (
  <FormProviderWrapper<TaskFormData>
    defaultValues={defaultValues}
    schema={taskFormSchema}
  >
    {({ handleSubmit, reset }) => (
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        {formTitle && (
          <Typography variant="h4" gutterBottom>
            {formTitle}
          </Typography>
        )}
        <FormInput name="title" label="任务标题" />
        <DatePickerField name="dueDate" label="截止日期" />
        <PrioritySelect />
        <TagInput name="tags" label="标签" />
        <FormInput
          name="estimatedHours"
          label="工作量预估"
          type="number"
          validation={{ valueAsNumber: true }}
        />
        <Button type="submit" variant="contained">
          {submitButtonText}
        </Button>
      </form>
    )}
  </FormProviderWrapper>
);

export default BaseTaskForm;
