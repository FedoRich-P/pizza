import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlockSkeleton } from '../components/PizzaBlock/PizzaBlockSkeleton';
import { PizzaBlock } from '../components/PizzaBlock';
import { useGetPizzas } from '../hooks/useGetPizzas';
import { useAppDispatch, useAppSelector } from '../app/hooks'; // Кастомные хуки для типизированного Redux
import { setCategoryId } from '../features/filterSlice';

export const BASE_URL = 'https://67e65f996530dbd3110fb55d.mockapi.io/items';

export const Home = () => {
  const categoryId = useAppSelector((state) => state.filter.categoryId);
  const sortType = useAppSelector((state) => state.filter.sort.sortType);
  const sortDirection = useAppSelector((state) => state.filter.sort.sortDirection);
  const searchValue = useAppSelector((state) => state.filter.search);

  const dispatch = useAppDispatch();

  const { pizza, isLoading, error } = useGetPizzas({
    url: BASE_URL,
    category: categoryId,
    sortBy: sortType,
    order: sortDirection,
    search: searchValue,
  });

  const filteredPizzas = searchValue
    ? pizza.filter((pizza) =>
      pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    : pizza;

  const setCategoryIdHandler = (id: number) => {
    dispatch(setCategoryId(id));
  };

  if (error) return <h2>Ошибка: {error.message}</h2>;

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId}
                    setCategoryId={setCategoryIdHandler} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
            <PizzaBlockSkeleton key={`skeleton-${index}`} />
          ))
          : filteredPizzas.map((pizza) => (
            <PizzaBlock key={pizza.id} {...pizza} />
          ))}
      </div>
    </div>
  );
};