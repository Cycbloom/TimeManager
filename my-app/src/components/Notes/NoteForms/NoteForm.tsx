import { useContext } from "react";
import { NoteFormData, Note } from "@/types/notes";
import BaseNoteForm from "./BaseNoteForm";
import { NotebookContext } from "../NotebookContext";

interface Props {
  onAddNote: (data: Omit<Note, "id">) => void;
}

const NoteForm = ({ onAddNote }: Props) => {
  const { selectedNotebook } = useContext(NotebookContext);

  const onSubmit = (data: NoteFormData) => {
    onAddNote({
      ...data,
      notebook_id: selectedNotebook,
    });
  };

  return (
    <BaseNoteForm
      onSubmit={onSubmit}
      submitButtonText="Add Note"
      formTitle="My Notes"
    />
  );
};

export default NoteForm;
