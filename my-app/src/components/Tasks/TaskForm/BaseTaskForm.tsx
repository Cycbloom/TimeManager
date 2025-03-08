import { SubmitHandler, useForm } from "react-hook-form";
import { TaskFormData, taskFormSchema } from "../../../types/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

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
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  });

  const [tagsInput, setTagsInput] = useState("");

  const handleFormSubmit: SubmitHandler<TaskFormData> = (data) => {
    onSubmit(data);
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {formTitle && (
        <Typography variant="h4" gutterBottom>
          {formTitle}
        </Typography>
      )}
      <TextField
        label="任务标题"
        variant="outlined"
        fullWidth
        {...register("title")}
        value={watch("title") || ""}
        error={!!errors.title}
        helperText={errors.title?.message}
        margin="normal"
      />
      <TextField
        label="截止日期"
        type="date"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("dueDate", {
          valueAsDate: true,
          setValueAs: (v) => (v ? new Date(v) : null),
        })}
        value={dayjs(watch("dueDate")).format("YYYY-MM-DD")}
        error={!!errors.dueDate}
        helperText={errors.dueDate?.message}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>优先级</InputLabel>
        <Select
          label="优先级"
          {...register("priority")}
          value={watch("priority")}
          error={!!errors.priority}
        >
          <MenuItem value="low">低</MenuItem>
          <MenuItem value="medium">中</MenuItem>
          <MenuItem value="high">高</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <TextField
          label="Tags"
          variant="outlined"
          fullWidth
          error={!!errors.tags}
          helperText={errors.tags?.message}
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const newTags = [...watch("tags"), tagsInput];
              reset({ ...watch(), tags: newTags });
              setTagsInput("");
            }
          }}
          margin="normal"
        />
        <Box>
          {watch("tags").map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => {
                const newTags = watch("tags").filter((_, i) => i !== index);
                reset({ ...watch(), tags: newTags });
              }}
            />
          ))}
        </Box>
      </Box>
      <TextField
        label="工作量预估"
        type="number"
        variant="outlined"
        fullWidth
        {...register("estimatedHours", { valueAsNumber: true })}
        value={watch("estimatedHours") || ""}
        error={!!errors.estimatedHours}
        helperText={errors.estimatedHours?.message}
        margin="normal"
      />
      <Button type="submit" variant="contained">
        {submitButtonText}
      </Button>
    </form>
  );
};

export default BaseTaskForm;
