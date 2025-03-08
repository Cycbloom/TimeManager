// src/components/NoteLists/BaseNoteForm.tsx
import { Button, Typography } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { NoteFilterContext } from "./NoteFilterContext";
import { NoteFormData } from "../../types/notes";
import { FormProviderWrapper } from "./FormPrividerWrapper";
import { FormInput } from "../forms/FromInput";
import { TypeSelect } from "../forms/TypeSelect";
import { TagInput } from "../forms/TagInput";

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
  const { setTagsDirty } = useContext(NoteFilterContext);

  return (
    <FormProviderWrapper defaultValues={defaultValues}>
      {({ handleSubmit, reset }) => (
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            const tagsChanged =
              JSON.stringify(data.tags) !== JSON.stringify(defaultValues.tags);
            if (tagsChanged) setTagsDirty();
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
          <TypeSelect name="type" label="Type" />
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
