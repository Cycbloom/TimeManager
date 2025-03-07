// src/hooks/useNote.ts
import useData from "./useData";
import { Note } from "@mui/icons-material";
import { FormData } from "../components/NoteLists/BaseNoteForm";
import { NoteQuery } from "../components/NoteLists/NotesPage";
import { useMemo } from "react"; // 引入 useMemo

export interface Note extends FormData {
  id: number;
  notebook_id: number | null;
}

const useNote = (noteQuery: NoteQuery) => {
  // 使用 useMemo 稳定 noteQuery 的引用
  const stableNoteQuery = useMemo(
    () => noteQuery,
    [
      JSON.stringify(noteQuery), // 将 noteQuery 序列化为字符串作为依赖项
    ]
  );

  return useData<Note>("/api/notes", { params: stableNoteQuery }, [
    stableNoteQuery,
  ]);
};

export default useNote;
