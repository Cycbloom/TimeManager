import BaseNoteForm from "./BaseNoteForm";
import { NoteFormData, Note } from "../../types";

interface Props {
  note: Note;
  onUpdateNote: (data: Note) => void;
  onClose: () => void;
}

const EditNoteForm = ({ note, onUpdateNote, onClose }: Props) => {
  const onSubmit = (data: NoteFormData) => {
    onUpdateNote({
      id: note.id, // 保留原始 ID
      notebook_id: note.notebook_id,
      ...data,
    });
    onClose(); // 关闭编辑窗口
  };

  return (
    <BaseNoteForm
      onSubmit={onSubmit}
      defaultValues={note}
      submitButtonText="Save"
      formTitle="Edit Note"
    />
  );
};

export default EditNoteForm;
