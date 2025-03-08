// src/data/DataContext.tsx
import { createContext, useContext } from "react";
import { createNotesSlice, NotesSlice } from "./notes";
import { createNotebooksSlice, NotebooksSlice } from "./notebooks";
import { createTagsSlice, tagsSlice } from "./tags";

export type DataContextType = {
  notes: NotesSlice;
  notebooks: NotebooksSlice;
  tags: tagsSlice;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const notes = createNotesSlice();
  const notebooks = createNotebooksSlice();
  const tags = createTagsSlice();
  return (
    <DataContext.Provider value={{ notes, notebooks, tags }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
