// src/data/noteSlice.ts
import { createDataSlice } from "./DataSlice";
import { Note, NoteQuery } from "../types/notes";
import apiClient from "../utils/api-client";

export function createNotesSlice() {
  const baseSlice = createDataSlice<Note, NoteQuery>({
    endpoint: "/api/notes",
  });

  const moveToNotebook = async (noteId: number, notebookId: number) => {
    try {
      await apiClient.patch(`/api/notes/${noteId}/notebook`, { notebookId });
      baseSlice._setData((prev) =>
        prev.map((note) =>
          note.id === noteId ? { ...note, notebook_id: notebookId } : note
        )
      );
    } catch (error) {
      baseSlice._setError(
        error instanceof Error ? error.message : "移动笔记失败"
      );
    }
  };

  return {
    ...baseSlice,
    moveToNotebook,
  };
}

export type NotesSlice = Omit<
  ReturnType<typeof createNotesSlice>,
  "_setData" | "_setError"
>;
