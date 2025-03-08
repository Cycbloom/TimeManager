// src/hooks/useNotebooks.ts
import useData from "./useData";

export interface Notebook {
  id: number;
  name: string;
}

/**
 * @deprecated This hook is no longer recommended for use.
 */
const useNotebooks = (initialQuery = {}) => {
  // 使用 useData 获取笔记本数据
  const {
    data: notebooks,
    error,
    loading,
    postData: createNotebook,
    deleteData: deleteNotebook,
    updateData: updateNotebook,
    refetch: refreshNotebooks,
  } = useData<Notebook>(
    "/api/notebooks",
    { params: initialQuery },
    [JSON.stringify(initialQuery)] // 依赖项数组
  );

  // 扩展专用操作方法
  const renameNotebook = (id: number, newName: string) => {
    return updateNotebook({ id, name: newName } as Notebook);
  };

  return {
    notebooks,
    error,
    loading,
    actions: {
      createNotebook,
      deleteNotebook,
      renameNotebook,
      refreshNotebooks,
    },
  };
};

export default useNotebooks;
