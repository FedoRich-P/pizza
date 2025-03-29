import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pizza } from '../types';

export const useGetPizzas = ({ url, category, sortBy, order }: UseGetPizzasProps) => {
  const [pizza, setPizza] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();

        if (category !== undefined && category !== 0) {
          params.append('category', category.toString());
        }
        if (sortBy) {
          params.append('sortBy', sortBy);
          if (order) params.append('order', order);
        }
        const apiUrl = params.toString()
          ? `${url}?${params.toString()}`
          : url;

        const response = await axios.get<Pizza[]>(apiUrl, {
          signal: controller.signal
        });

        setPizza(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error instanceof Error ? error : new Error('Ошибка запроса'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, category, sortBy, order]);

  return { pizza, isLoading, error };
};

type UseGetPizzasProps = {
  url: string;
  category?: number;
  sortBy?: string;
  order?: string;
};