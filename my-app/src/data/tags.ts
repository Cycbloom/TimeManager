// src/data/notes.ts
import { createDataSlice } from "./DataSlice";
import { Tag } from "../types/notes";

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
