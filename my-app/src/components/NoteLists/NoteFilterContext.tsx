import { createContext, useState } from "react";

import { NoteType } from "./BaseNoteForm";

export interface Tag {
  id: number;
  name: string;
}

interface NoteFilterContextType {
  selectedType: NoteType | null;
  selectedTags: Tag[];
  tagsDirty: boolean;
  setSelectedType: (type: NoteType | null) => void;
  setSelectedTags: (tags: Tag[]) => void;
  setTagsDirty: (dirty: boolean) => void;
}

export const NoteFilterContext = createContext<NoteFilterContextType>({
  selectedType: null,
  selectedTags: [],
  tagsDirty: false,
  setSelectedType: () => {},
  setSelectedTags: () => {},
  setTagsDirty: () => {},
});

export const NoteFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 定义状态
  const [selectedType, setSelectedType] = useState<NoteType | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagsDirty, setTagsDirty] = useState(false);

  return (
    <NoteFilterContext.Provider
      value={{
        selectedType,
        selectedTags,
        tagsDirty,
        setSelectedType,
        setSelectedTags,
        setTagsDirty,
      }}
    >
      {children}
    </NoteFilterContext.Provider>
  );
};
