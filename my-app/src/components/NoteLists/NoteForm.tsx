import { useContext } from "react";
import { NoteFormData, Note } from "../../types";
import BaseNoteForm from "./BaseNoteForm";
import { NoteFilterContext } from "./NoteFilterContext";

interface Props {
  onAddNote: (data: Note) => void;
}

const NoteForm = ({ onAddNote }: Props) => {
  const { selectedNotebook } = useContext(NoteFilterContext);

  const onSubmit = (data: NoteFormData) => {
    onAddNote({
      id: 0, // ID 由后端生成
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
