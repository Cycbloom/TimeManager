import { useCallback, useState } from "react";
import apiClient from "../utils/api-client";
import { QueryParams, BaseEntity } from "../types/model";

// 通用请求配置类型
interface DataRequestConfig<TQuery extends QueryParams = QueryParams> {
  endpoint: string;
  initialQuery?: TQuery;
}

// 通用数据切片类型
interface DataSlice<
  T extends BaseEntity,
  TQuery extends QueryParams = QueryParams
> {
  data: T[];
  error: string;
  loading: boolean;
  fetch: (query?: TQuery) => Promise<void>;
  create: (item: Omit<T, keyof BaseEntity>) => Promise<void>;
  update: (
    id: number,
    item: Partial<Omit<T, keyof BaseEntity>>
  ) => Promise<void>;
  delete: (id: number) => Promise<void>;

  //缓存功能
  currentQuery: TQuery | undefined;
  refresh: () => Promise<void>;

  // 暴露内部状态更新方法
  _setData: React.Dispatch<React.SetStateAction<T[]>>;
  _setError: React.Dispatch<React.SetStateAction<string>>;
}

// 创建通用数据切片的工厂函数
export function createDataSlice<
  T extends BaseEntity,
  TQuery extends QueryParams = QueryParams
>(config: DataRequestConfig<TQuery>): DataSlice<T, TQuery> {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState<TQuery | undefined>(
    config.initialQuery
  );

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
      () => apiClient.get<T[]>(config.endpoint, { params: query }),
      (response) => {
        setData(response.data);
        setCurrentQuery(query);
      }
    );
  }, []);

  const refresh = useCallback(async () => {
    await handleRequest(
      () => apiClient.get<T[]>(config.endpoint, { params: currentQuery || {} }),
      (response) => {
        setData(response.data);
      }
    );
  }, [currentQuery]);

  const create = useCallback(async (item: Omit<T, keyof BaseEntity>) => {
    return handleRequest(
      () => apiClient.post<T>(config.endpoint, item),
      (response) => setData((prev) => [response.data, ...prev])
    );
  }, []);

  const update = useCallback(
    async (id: number, item: Partial<Omit<T, keyof BaseEntity>>) => {
      await handleRequest(
        () => apiClient.put<T>(`${config.endpoint}/${id}`, item),
        (response) =>
          setData((prev) => prev.map((i) => (i.id === id ? response.data : i)))
      );
    },
    []
  );

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
    currentQuery,
    fetch,
    refresh,
    create,
    update,
    delete: deleteItem,
    _setData: setData,
    _setError: setError,
  };
}

// 使用Omit隐藏内部方法
export type PublicDataSlice<
  T extends BaseEntity,
  TQuery extends QueryParams = QueryParams
> = Omit<DataSlice<T, TQuery>, "_setData" | "_setError">;
