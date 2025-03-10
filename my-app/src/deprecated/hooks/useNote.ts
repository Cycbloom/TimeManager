// src/hooks/useNote.ts
import useData from "./useData";
import { Note, NoteQuery } from "../types/notes"; // 更新导入路径

import { useMemo } from "react"; // 引入 useMemo

/**
 * @deprecated This hook is no longer recommended for use.
 */
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
