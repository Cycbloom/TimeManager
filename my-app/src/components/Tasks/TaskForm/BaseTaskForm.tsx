import { SubmitHandler } from "react-hook-form";
import { TaskFormData, taskFormSchema } from "../../../types/tasks";
import { Box, Button, Typography } from "@mui/material";
import { DatePickerField } from "../../forms/DatePickerField";
import { PrioritySelect } from "../../forms/PrioritySelect";
import { FormProviderWrapper } from "../../forms/FromPrividerWrapper";
import { FormInput } from "../../forms/FromInput";
import { TagInput } from "../../forms/TagInput";
import { EstimateSlider } from "@/components/forms/EstimateSlider";

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
        <Box display="flex" gap={3} mt={2}>
          <Box flex={1}>
            <DatePickerField name="dueDate" label="截止日期" />
          </Box>
          <Box flex={1}>
            <PrioritySelect />
          </Box>
        </Box>
        <EstimateSlider
          name="estimatedHours"
          label="工作量预估"
          max={40}
          step={0.5}
        />
        <TagInput name="tags" label="标签" />
        <Button type="submit" variant="contained">
          {submitButtonText}
        </Button>
      </form>
    )}
  </FormProviderWrapper>
);

export default BaseTaskForm;
