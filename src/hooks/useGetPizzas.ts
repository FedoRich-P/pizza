import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useQueryParams } from './useQueryParams';
import { Pizza } from '@/types';

export const useGetPizzas = ({ url, ...params }: UseGetPizzasProps) => {
  const [pizza, setPizza] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const queryString = useQueryParams(params);

  const fetchData = useCallback(async (controller: AbortController) => {
    if (!url) {
      setError(new Error('URL не должен быть пустым'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const apiUrl = queryString ? `${url}?${queryString}` : url;
      const response = await axios.get<Pizza[]>(apiUrl, {
        signal: controller.signal,
      });

      setPizza(response.data);
      setError(response.data.length === 0 ? new Error('Ничего не найдено') : null);
    } catch (error) {
      if (!axios.isCancel(error)) {
        setError(error instanceof Error ? error : new Error('Ошибка запроса'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, queryString]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);
    return () => controller.abort();
  }, [fetchData]);

  return { pizza, isLoading, error };
};

type UseGetPizzasProps = {
  url: string;
  category?: number;
  sortBy?: string;
  order?: string;
  search?: string;
};