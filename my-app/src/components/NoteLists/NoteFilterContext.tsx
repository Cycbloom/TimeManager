// src/components/NoteLists/NoteFilterContext.tsx
import { createContext, useState } from "react";

import { NoteType, Tag } from "../../types/notes";

interface NoteFilterContextType {
  selectedType: NoteType | null;
  selectedTags: Tag[];
  tagsDirty: number;
  selectedNotebook: number | null;
  setSelectedType: (type: NoteType | null) => void;
  setSelectedTags: (tags: Tag[]) => void;
  setTagsDirty: () => void; // 外部调用时不需要参数
  setSelectedNotebook: (notebookId: number | null) => void;
}

export const NoteFilterContext = createContext<NoteFilterContextType>({
  selectedType: null,
  selectedTags: [],
  tagsDirty: 0, // 初始化计数器为 0
  selectedNotebook: null,
  setSelectedType: () => {},
  setSelectedTags: () => {},
  setTagsDirty: () => {}, // 外部调用时不需要参数
  setSelectedNotebook: () => {},
});

export const NoteFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 定义状态
  const [selectedType, setSelectedType] = useState<NoteType | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagsDirty, setTagsDirtyInternal] = useState(0); // 内部使用计数器
  const [selectedNotebook, setSelectedNotebook] = useState<number | null>(null);

  // 对外暴露的 setTagsDirty 方法，不需要参数，内部默认加一
  const setTagsDirty = () => {
    setTagsDirtyInternal((prev) => prev + 1);
  };

  return (
    <NoteFilterContext.Provider
      value={{
        selectedType,
        selectedTags,
        tagsDirty, // 暴露计数器
        selectedNotebook,
        setSelectedType,
        setSelectedTags,
        setTagsDirty, // 暴露无需参数的方法
        setSelectedNotebook,
      }}
    >
      {children}
    </NoteFilterContext.Provider>
  );
};
