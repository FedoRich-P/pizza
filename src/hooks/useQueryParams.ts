import { useMemo } from 'react';
import { useDebounce } from './useDebounce.ts';

type QueryParams = {
  category?: number;
  sortBy?: string;
  order?: string;
  search?: string;
};

export const useQueryParams = (params: QueryParams) => {
  const debouncedSearch = useDebounce(params.search, 500);

  return useMemo(() => {
    const searchParams = new URLSearchParams();

    if (debouncedSearch) searchParams.append('search', debouncedSearch);
    if (params.category && params.category !== 0) {
      searchParams.append('category', params.category.toString());
    }
    if (params.sortBy) {
      searchParams.append('sortBy', params.sortBy);
      if (params.order) searchParams.append('order', params.order);
    }

    return searchParams.toString();
  }, [debouncedSearch, params.category, params.sortBy, params.order]);
};