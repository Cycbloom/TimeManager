import { createContext, useState } from "react";

import { NoteType } from "./BaseNoteForm";

export interface Tag {
  id: number;
  name: string;
}

interface NoteFilterContextType {
  selectedType: NoteType | null;
  selectedTags: Tag[];
  tagsDirty: number; // 将 tagsDirty 改为计数器
  setSelectedType: (type: NoteType | null) => void;
  setSelectedTags: (tags: Tag[]) => void;
  setTagsDirty: () => void; // 外部调用时不需要参数
}

export const NoteFilterContext = createContext<NoteFilterContextType>({
  selectedType: null,
  selectedTags: [],
  tagsDirty: 0, // 初始化计数器为 0
  setSelectedType: () => {},
  setSelectedTags: () => {},
  setTagsDirty: () => {}, // 外部调用时不需要参数
});

export const NoteFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 定义状态
  const [selectedType, setSelectedType] = useState<NoteType | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagsDirty, setTagsDirtyInternal] = useState(0); // 内部使用计数器

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
        setSelectedType,
        setSelectedTags,
        setTagsDirty, // 暴露无需参数的方法
      }}
    >
      {children}
    </NoteFilterContext.Provider>
  );
};
