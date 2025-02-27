import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
  type: z.enum(["article", "problem", "solution", "reference"]),
});

export type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: SubmitHandler<FormData>;
  defaultValues?: Partial<FormData>;
  submitButtonText: string;
  formTitle: string;
}

const BaseNoteForm = ({
  onSubmit,
  defaultValues = { title: "", content: "" }, // 默认值
  submitButtonText,
  formTitle,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
    reset(); // 提交后清空表单
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {formTitle && (
        <Typography variant="h4" gutterBottom>
          {formTitle}
        </Typography>
      )}
      <Box>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          {...register("title")}
          value={watch("title") || ""}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
          sx={{
            "& .MuiFormHelperText-root": {
              color: "red",
            },
          }}
        />
      </Box>
      <Box>
        <TextField
          label="Content"
          variant="outlined"
          {...register("content")}
          value={watch("content") || ""}
          error={!!errors.content}
          helperText={errors.content?.message}
          fullWidth
          multiline
          sx={{
            "& .MuiFormHelperText-root": {
              color: "red",
            },
          }}
        />
      </Box>
      <Box>
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            {...register("type")}
            value={watch("type")}
            error={!!errors.type}
          >
            <MenuItem value="article">Article</MenuItem>
            <MenuItem value="problem">Problem</MenuItem>
            <MenuItem value="solution">Solution</MenuItem>
            <MenuItem value="reference">Reference</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginTop: "10px" }}
      >
        {submitButtonText}
      </Button>
    </form>
  );
};

export default BaseNoteForm;
