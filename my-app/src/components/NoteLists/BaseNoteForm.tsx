import { Box, Button, TextField, Typography } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
});

export type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: SubmitHandler<FormData>;
  defaultValues?: Partial<FormData>;
  submitButtonText: string;
  formTitle: string;
}

const NoteForm = ({
  onSubmit,
  defaultValues,
  submitButtonText,
  formTitle,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

export default NoteForm;
