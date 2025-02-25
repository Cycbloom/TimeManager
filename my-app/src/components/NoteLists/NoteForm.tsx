import { Box, Button, TextField, Typography } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Note } from "../../hooks/useNote";

interface Props {
  onAddNote: (data: Note) => void;
}

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
});

type FormData = z.infer<typeof schema>;

const NoteForm = ({ onAddNote }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    onAddNote({
      id: 0,
      ...data,
    });
    reset(); // 清空表单
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>
        My Notes
      </Typography>
      <Box>
        <TextField
          label="New Note Title"
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
          label="New Note"
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
        Add Note
      </Button>
    </form>
  );
};

export default NoteForm;
