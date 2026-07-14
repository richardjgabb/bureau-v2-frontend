import { useState, useEffect, useCallback } from 'react';
import type { FetchState } from './types';
import apiRequest from '../ApiClient/ApiClient';

export function useFetch<T = unknown>(
  url: string,
): FetchState<T> {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Use useCallback to memoize the fetch logic and avoid unnecessary re-creations
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);

    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  return { data, loading, error };
}
