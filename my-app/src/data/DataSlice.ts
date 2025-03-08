import { useCallback, useState } from "react";
import apiClient from "../services/api-client";

// 基础类型定义
export interface BaseEntity {
  id: number;
}

// 通用请求配置类型
interface DataRequestConfig<TQuery = unknown> {
  endpoint: string;
  initialQuery?: TQuery;
}

// 通用数据切片类型
interface DataSlice<T extends BaseEntity, TQuery = unknown> {
  data: T[];
  error: string;
  loading: boolean;
  fetch: (query?: TQuery) => Promise<void>;
  create: (item: Omit<T, "id">) => Promise<void>;
  update: (item: T) => Promise<void>;
  delete: (id: number) => Promise<void>;

  // 暴露内部状态更新方法
  _setData: React.Dispatch<React.SetStateAction<T[]>>;
  _setError: React.Dispatch<React.SetStateAction<string>>;
}

// 创建通用数据切片的工厂函数
export function createDataSlice<T extends BaseEntity, TQuery = unknown>(
  config: DataRequestConfig<TQuery>
): DataSlice<T, TQuery> {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async <R>(
    request: () => Promise<R>,
    successHandler: (result: R) => void
  ) => {
    setLoading(true);
    try {
      const result = await request();
      successHandler(result);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const fetch = useCallback(async (query?: TQuery) => {
    await handleRequest(
      () => apiClient.get<{ results: T[] }>(config.endpoint, { params: query }),
      (response) => setData(response.data.results)
    );
  }, []);

  const create = useCallback(async (item: Omit<T, "id">) => {
    return handleRequest(
      () => apiClient.post<T>(config.endpoint, item),
      (response) => setData((prev) => [response.data, ...prev])
    );
  }, []);

  const update = useCallback(async (item: T) => {
    await handleRequest(
      () => apiClient.put<T>(`${config.endpoint}/${item.id}`, item),
      (response) =>
        setData((prev) =>
          prev.map((i) => (i.id === item.id ? response.data : i))
        )
    );
  }, []);

  const deleteItem = useCallback(async (id: number) => {
    await handleRequest(
      () => apiClient.delete(`${config.endpoint}/${id}`),
      () => setData((prev) => prev.filter((i) => i.id !== id))
    );
  }, []);

  return {
    data,
    error,
    loading,
    fetch,
    create,
    update,
    delete: deleteItem,
    _setData: setData,
    _setError: setError,
  };
}
