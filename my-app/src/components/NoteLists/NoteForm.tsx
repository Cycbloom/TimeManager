import { Note } from "../../hooks/useNote";
import { FormData } from "./BaseNoteForm";
import BaseNoteForm from "./BaseNoteForm";

interface Props {
  onAddNote: (data: Note) => void;
}

const NoteForm = ({ onAddNote }: Props) => {
  const onSubmit = (data: FormData) => {
    onAddNote({
      id: 0, // ID 由后端生成
      ...data,
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
