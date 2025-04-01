// src/components/NoteLists/BaseNoteForm.tsx
import { Button, Typography } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { NoteFormData, noteFormSchema } from "@/types/notes";
import {
  FormProviderWrapper,
  FormInput,
  TypeSelect,
  TagInput,
} from "@/components/forms";
import { useData } from "@/data/DataContext";

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
  const { tags } = useData();

  return (
    <FormProviderWrapper<NoteFormData>
      defaultValues={defaultValues}
      schema={noteFormSchema}
    >
      {({ handleSubmit, reset }) => (
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            const tagsChanged =
              JSON.stringify(data.tags) !== JSON.stringify(defaultValues.tags);
            if (tagsChanged) tags.fetch();
            reset(defaultValues);
          })}
        >
          {formTitle && (
            <Typography variant="h4" gutterBottom>
              {formTitle}
            </Typography>
          )}
          <FormInput name="title" label="Title" />
          <FormInput name="content" label="Content" multiline />
          <TypeSelect />
          <TagInput name="tags" label="Tags" />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            {submitButtonText}
          </Button>
        </form>
      )}
    </FormProviderWrapper>
  );
};

export default BaseNoteForm;
