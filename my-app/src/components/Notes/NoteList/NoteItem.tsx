// src/components/NoteLists/NoteItem.tsx
import BaseItem from "@/components/Lists/BaseItem";
import { Note } from "@/types/notes";
import NoteContent from "./NoteContent";

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
      primaryContent={<NoteContent note={note} />}
      dataType="note"
    />
  );
};

export default NoteItem;
