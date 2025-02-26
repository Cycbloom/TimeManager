import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

interface IdEntity {
  id: number;
}

const useData = <T extends IdEntity>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const contoller = new AbortController();

      setLoading(true);
      apiClient
        .get<FetchResponse<T>>(endpoint, {
          signal: contoller.signal,
          ...requestConfig,
        })
        .then((response) => {
          setData(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          if (error instanceof CanceledError) return;
          setError(error.message);
          setLoading(false);
        });

      return () => {
        contoller.abort();
      };
    },
    deps ? [...deps] : []
  );

  const postData = (postData: T) => {
    setLoading(true);
    apiClient
      .post<T>(endpoint, { ...postData }, requestConfig)
      .then((response) => {
        setData([...data, response.data]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const deleteData = (id: number) => {
    setLoading(true);
    apiClient
      .delete(`${endpoint}/${id}`, requestConfig)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return { data, error, loading, postData, deleteData };
};
export default useData;
