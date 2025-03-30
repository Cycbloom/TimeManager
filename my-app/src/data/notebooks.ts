// src/data/notebooks.ts
import { createDataSlice } from "./DataSlice";
import { Notebook } from "../types/notes";
import apiClient from "../utils/api-client";

export function createNotebooksSlice() {
  const baseSlice = createDataSlice<Notebook>({ endpoint: "/api/notebooks" });

  const rename = async (id: number, newName: string) => {
    try {
      await apiClient.patch(`/api/notebooks/${id}/rename`, { name: newName });
      baseSlice._setData((prev) =>
        prev.map((notebook) =>
          notebook.id === id ? { ...notebook, name: newName } : notebook
        )
      );
    } catch (error) {
      baseSlice._setError(
        error instanceof Error ? error.message : "重命名失败"
      );
    }
  };

  return {
    ...baseSlice,
    rename,
  };
}

export type NotebooksSlice = Omit<
  ReturnType<typeof createNotebooksSlice>,
  "_setData" | "_setError"
>;
