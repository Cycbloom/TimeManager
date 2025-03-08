import { SubmitHandler } from "react-hook-form";
import { TaskFormData } from "../../../types/tasks";
import { Button, Typography } from "@mui/material";
import { DatePickerField } from "../../forms/DatePickerField";
import { PrioritySelect } from "../../forms/PrioritySelect";
import { FormProviderWrapper } from "./FromPrividerWrapper";
import { FormInput } from "../../forms/FromInput";
import { TagInput } from "../../forms/TagInput";

interface Props {
  onSubmit: SubmitHandler<TaskFormData>;
  defaultValues?: Partial<TaskFormData>;
  submitButtonText: string;
  formTitle: string;
}

const BaseTaskForm = ({ onSubmit, submitButtonText, formTitle }: Props) => (
  <FormProviderWrapper>
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
        <PrioritySelect name="priority" label="优先级" />
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
