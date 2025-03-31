import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Pizza } from '../types';
import { useDebounce } from '../hooks/useDebounce'; // Импортируем хук

export const useGetPizzas = ({ url, category, sortBy, order, search }: UseGetPizzasProps) => {
  const [pizza, setPizza] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const params = useMemo(() => {
    const p = new URLSearchParams();
    if (debouncedSearch) p.append('search', debouncedSearch);
    if (category && category !== 0) p.append('category', category.toString());
    if (sortBy) {
      p.append('sortBy', sortBy);
      if (order) p.append('order', order);
    }
    return p.toString();
  }, [debouncedSearch, category, sortBy, order]);

  const fetchData = useCallback(async (controller: AbortController) => {
    if (!url) {
      setError(new Error('URL не должен быть пустым'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const apiUrl = params ? `${url}?${params}` : url;

      const response = await axios.get<Pizza[]>(apiUrl, {
        signal: controller.signal,
      });

      if (response.status === 200 && response.data.length > 0) {
        setPizza(response.data);
        setError(null);
      } else {
        setPizza([]);
        setError(new Error('Ничего не найдено'));
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Ошибка запроса:', error);
        setPizza([]);
        setError(error instanceof Error ? error : new Error('Ошибка запроса'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);
    return () => controller.abort();
  }, [fetchData]);

  return { pizza, isLoading, error };
};

// Типизация пропсов
type UseGetPizzasProps = {
  url: string;
  category?: number;
  sortBy?: string;
  order?: string;
  search?: string;
};
