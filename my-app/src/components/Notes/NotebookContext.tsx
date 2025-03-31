// src/components/NoteLists/NoteFilterContext.tsx
import { createContext, useState } from "react";

import { NoteType, Tag } from "../../types/notes";

interface NotebookContextType {
  selectedNotebook: number | null;
  setSelectedNotebook: (notebookId: number | null) => void;
}

export const NotebookContext = createContext<NotebookContextType>({
  selectedNotebook: null,
  setSelectedNotebook: () => {},
});

export const NotebookProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedNotebook, setSelectedNotebook] = useState<number | null>(null);

  return (
    <NotebookContext.Provider
      value={{
        selectedNotebook,
        setSelectedNotebook,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
};
