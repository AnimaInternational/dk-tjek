import { AxiosRequestConfig } from "axios";
import { useEffect, useState, useRef } from "react";
import axios from "../../axios";

export const useFetch = <T = any>(
  endpoint: string,
  options: AxiosRequestConfig = {}
) => {
  const optionsRef = useRef(options);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<T>(`${endpoint}`, optionsRef.current);
        setData(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [endpoint]);

  return { data, error, loading };
};
