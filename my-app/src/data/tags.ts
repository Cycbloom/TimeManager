// src/data/notes.ts
import { createDataSlice } from "./DataSlice";
import { Tag } from "../components/NoteLists/NoteFilterContext";

export function createTagsSlice() {
  const baseSlice = createDataSlice<Tag>({
    endpoint: "/api/tags",
  });

  return {
    ...baseSlice,
  };
}

export type tagsSlice = Omit<
  ReturnType<typeof createTagsSlice>,
  "_setData" | "_setError"
>;
