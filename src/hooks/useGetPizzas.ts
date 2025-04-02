import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPizzas } from '@/features/pizzaSlice';
import { useQueryParams } from '@/hooks/useQueryParams';

export const useGetPizzas = (params: UseGetPizzasProps) => {
  const dispatch = useAppDispatch();
  const { items: pizza, isLoading, error } = useAppSelector((state) => state.pizza);
  const queryString = useQueryParams(params);

  useEffect(() => {
    if (!queryString) return;

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== 0 && value !== '')
    );

    dispatch(fetchPizzas(filteredParams));
  }, [queryString, dispatch]);

  return { pizza, isLoading, error };
};


type UseGetPizzasProps = {
  url: string;
  category?: number;
  sortBy?: string;
  order?: string;
  search?: string;
};

// export const useGetPizzas = ({ url, ...params }: UseGetPizzasProps) => {
//   const [pizza, setPizza] = useState<Pizza[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//
//   const queryString = useQueryParams(params);
//
//   const fetchData = useCallback(async (controller: AbortController) => {
//     if (!url) {
//       setError(new Error('URL не должен быть пустым'));
//       setIsLoading(false);
//       return;
//     }
//
//     try {
//       setIsLoading(true);
//       const apiUrl = queryString ? `${url}?${queryString}` : url;
//       const response = await axios.get<Pizza[]>(apiUrl, {
//         signal: controller.signal,
//       });
//
//       setPizza(response.data);
//       setError(response.data.length === 0 ? new Error('Ничего не найдено') : null);
//     } catch (error) {
//       if (!axios.isCancel(error)) {
//         setError(error instanceof Error ? error : new Error('Ошибка запроса'));
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [url, queryString]);
//
//   useEffect(() => {
//     const controller = new AbortController();
//     fetchData(controller);
//     return () => controller.abort();
//   }, [fetchData]);
//
//   return { pizza, isLoading, error };
// };