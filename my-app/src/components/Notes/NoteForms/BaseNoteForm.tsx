// src/components/NoteLists/BaseNoteForm.tsx
import { SubmitHandler } from "react-hook-form";
import { NoteFormData, noteFormSchema } from "@/types/notes";
import { FormInput, TypeSelect, TagInput } from "@/components/form-controls";
import BaseForm from "@/components/forms/BaseForm";

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
  return (
    <BaseForm<NoteFormData>
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      submitButtonText={submitButtonText}
      formTitle={formTitle}
      schema={noteFormSchema}
    >
      <FormInput name="title" label="Title" />
      <FormInput name="content" label="Content" multiline />
      <TypeSelect name="type" label="Type" />
      <TagInput name="tags" label="Tags" />
    </BaseForm>
  );
};

export default BaseNoteForm;
