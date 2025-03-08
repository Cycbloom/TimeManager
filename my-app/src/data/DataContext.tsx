// src/data/DataContext.tsx
import { createContext, useContext } from "react";
import { Tag } from "../components/NoteLists/NoteFilterContext";
import { createNotesSlice } from "./notes";
import { createNotebooksSlice } from "./notebooks";
import { createDataSlice } from "./DataSlice";

export type DataContextType = {
  notes: ReturnType<typeof createNotesSlice>;
  notebooks: ReturnType<typeof createNotebooksSlice>;
  tags: ReturnType<typeof createDataSlice<Tag>>;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const notes = createNotesSlice();
  const notebooks = createNotebooksSlice();
  const tags = createDataSlice<Tag>({ endpoint: "/api/tags" });
  return (
    <DataContext.Provider value={{ notes, notebooks, tags }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
