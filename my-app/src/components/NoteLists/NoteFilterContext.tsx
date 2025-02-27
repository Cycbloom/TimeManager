import { createContext, useState } from "react";

import { NoteType } from "./BaseNoteForm";

export interface Tag {
  id: number;
  name: string;
}

interface NoteFilterContextType {
  selectedType: NoteType | null;
  selectedTags: Tag[];
  setSelectedType: (type: NoteType | null) => void;
  setSelectedTags: (tags: Tag[]) => void;
}

export const NoteFilterContext = createContext<NoteFilterContextType>({
  selectedType: null,
  selectedTags: [],
  setSelectedType: () => {},
  setSelectedTags: () => {},
});

export const NoteFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 定义状态
  const [selectedType, setSelectedType] = useState<NoteType | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  return (
    <NoteFilterContext.Provider
      value={{ selectedType, selectedTags, setSelectedType, setSelectedTags }}
    >
      {children}
    </NoteFilterContext.Provider>
  );
};
