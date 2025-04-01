import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setCategoryId, setFilters } from '@/features/filterSlice';
import { SortDirection, SortType } from '@/types/types';
import { useGetPizzas } from '@/hooks/useGetPizzas';
import { Categories } from '@components/Categories';
import { Sort } from '@components/Sort';
import { PizzaBlockSkeleton } from '@components/PizzaBlock/PizzaBlockSkeleton';
import { PizzaBlock } from '@components/PizzaBlock';


export const BASE_URL = 'https://67e65f996530dbd3110fb55d.mockapi.io/items';

export const Home = () => {
  const categoryId = useAppSelector((state) => state.filter.categoryId);
  const sortType = useAppSelector((state) => state.filter.sort.sortType);
  const sortDirection = useAppSelector((state) => state.filter.sort.sortDirection);
  const searchValue = useAppSelector((state) => state.filter.search);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    dispatch(setFilters({
      categoryId: Number(params.get('category')) || 0,
      sort: {
        sortType: (params.get('sort') as SortType) || 'rating',
        sortDirection: (params.get('order') as SortDirection) || 'desc'
      },
      search: params.get('search') || ''
    }));
  }, [dispatch]);


  useEffect(() => {
    const params = new URLSearchParams();

    if (categoryId !== 0) params.append('category', categoryId.toString());
    if (sortType !== 'rating') params.append('sort', sortType);
    if (sortDirection !== 'desc') params.append('order', sortDirection);
    if (searchValue) params.append('search', searchValue);

    navigate(`?${params.toString()}`, { replace: true });
  }, [categoryId, sortType, sortDirection, searchValue, navigate]);

  const { pizza, isLoading, error } = useGetPizzas({
    url: BASE_URL,
    category: categoryId,
    sortBy: sortType,
    order: sortDirection,
    search: searchValue,
  });

  const setCategoryIdHandler = (id: number) => {
    dispatch(setCategoryId(id));
  };

  if (error) return <h2>Ошибка: {error.message}</h2>;

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          setCategoryId={setCategoryIdHandler}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <PizzaBlockSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          pizza
            .filter(p =>
              searchValue
                ? p.title.toLowerCase().includes(searchValue.toLowerCase())
                : true,
            )
            .map(pizza => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))
        )}
      </div>
    </div>
  );
};