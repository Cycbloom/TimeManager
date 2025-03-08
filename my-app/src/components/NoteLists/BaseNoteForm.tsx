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
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { NoteFilterContext } from "./NoteFilterContext";
import { NoteFormData, noteFormSchema } from "../../types/notes";

interface Props {
  onSubmit: SubmitHandler<NoteFormData>;
  defaultValues?: Partial<NoteFormData>;
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
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteFormSchema),
    defaultValues,
  });

  const [tagsInput, setTagsInput] = useState("");
  const { setTagsDirty } = useContext(NoteFilterContext);

  const handleFormSubmit: SubmitHandler<NoteFormData> = (data) => {
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
