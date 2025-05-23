// src/data/DataContext.tsx
import { createContext, useContext } from "react";
import { createNotesSlice, NotesSlice } from "./noteSlice";
import { createNotebooksSlice, NotebooksSlice } from "./notebooks";
import { createTagsSlice, tagsSlice } from "./tags";
import { createTasksSlice, TasksSlice } from "./tasks";

export type DataContextType = {
  notes: NotesSlice;
  notebooks: NotebooksSlice;
  tags: tagsSlice;
  tasks: TasksSlice;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const notes = createNotesSlice();
  const notebooks = createNotebooksSlice();
  const tags = createTagsSlice();
  const tasks = createTasksSlice();
  return (
    <DataContext.Provider value={{ notes, notebooks, tags, tasks }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
