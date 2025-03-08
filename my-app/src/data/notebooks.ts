// src/data/notebooks.ts
import { createDataSlice } from "./DataSlice";
import { Notebook } from "../hooks/useNotebooks";
import apiClient from "../services/api-client";

export function createNotebooksSlice() {
  const baseSlice = createDataSlice<Notebook>({ endpoint: "/api/notebooks" });

  const rename = async (id: number, newName: string) => {
    try {
      await apiClient.patch(`/api/notebooks/${id}/name`, { name: newName });
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

export type NotebooksSlice = ReturnType<typeof createNotebooksSlice>;
