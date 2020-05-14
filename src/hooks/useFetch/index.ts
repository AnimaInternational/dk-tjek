import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import axios from "../../axios";

export const useFetch = <T = any>(
  endpoint: string,
  options: AxiosRequestConfig = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<T>(`${endpoint}`, options);
        setData(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [endpoint, options]);

  return { data, error, loading };
};
