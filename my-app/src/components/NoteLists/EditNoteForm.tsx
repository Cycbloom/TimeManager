import { Note } from "../../hooks/useNote";
import BaseNoteForm from "./BaseNoteForm";
import { FormData } from "./BaseNoteForm";

interface Props {
  note: Note;
  onUpdateNote: (data: Note) => void;
  onClose: () => void;
}

const EditNoteForm = ({ note, onUpdateNote, onClose }: Props) => {
  const onSubmit = (data: FormData) => {
    onUpdateNote({
      id: note.id, // 保留原始 ID
      ...data,
    });
    onClose(); // 关闭编辑窗口
  };

  return (
    <BaseNoteForm
      onSubmit={onSubmit}
      defaultValues={{ title: note.title, content: note.content }}
      submitButtonText="Save"
      formTitle="Edit Note"
    />
  );
};

export default EditNoteForm;
