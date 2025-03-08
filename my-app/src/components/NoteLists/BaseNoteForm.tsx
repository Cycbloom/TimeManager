// src/components/NoteLists/BaseNoteForm.tsx
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { NoteFilterContext } from "./NoteFilterContext";

// 定义 type 的枚举
const typeEnum = z.enum(["article", "problem", "solution", "reference"]);
// 导出 type 的类型
export type NoteType = z.infer<typeof typeEnum>;
export const typeOptions = typeEnum.options;

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
  type: typeEnum,
  tags: z.array(z.string()),
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
  defaultValues = { title: "", content: "", type: "article", tags: [] },
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

  const [tagsInput, setTagsInput] = useState("");
  const { setTagsDirty } = useContext(NoteFilterContext);

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
    const tagsChanged =
      JSON.stringify(data.tags) !== JSON.stringify(defaultValues.tags);
    if (tagsChanged) setTagsDirty();
    reset(defaultValues);
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
