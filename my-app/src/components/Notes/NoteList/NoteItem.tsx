// src/components/NoteLists/NoteItem.tsx
import BaseItem from "@/components/Lists/BaseItem";
import { Note } from "@/types/notes";

interface Props {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

const NoteItem = ({ note, onEdit, onDelete }: Props) => {
  return (
    <BaseItem
      item={note}
      itemId={note.id}
      onEdit={onEdit}
      onDelete={onDelete}
      primaryContent={note.title}
      secondaryContent={note.content}
      dataType="note"
    />
  );
};

export default NoteItem;
