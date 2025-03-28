import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pizza } from '../types.ts';

export const useGetPizzas = (url: string) => {
  const [pizza, setPizza] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 2000));
        const result = await axios.get<Pizza[]>(url, {
          signal: controller.signal
        });
        setPizza(result.data);
      } catch (error) {
        if (!axios.isCancel(error) && error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [url]);
  return { pizza, isLoading, error };
};