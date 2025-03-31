import { useContext, useState } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlockSkeleton } from '../components/PizzaBlock/PizzaBlockSkeleton';
import { PizzaBlock } from '../components/PizzaBlock';
import { useGetPizzas } from '../hooks/useGetPizzas';
import { SearchContext } from '../App.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store.ts';
import { setCategoryId } from '../features/filterSlice.ts';

export const BASE_URL = 'https://67e65f996530dbd3110fb55d.mockapi.io/items'

export const Home = () => {
  // const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState('rating');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const categoryId = useSelector<RootState>(state => state?.filter?.categoryId);
  const dispatch = useDispatch();

  const {searchValue} = useContext(SearchContext)

  console.log(categoryId);
  const { pizza, isLoading, error } = useGetPizzas({
    url: BASE_URL,
    category: categoryId as number,
    sortBy: sortType,
    order: sortDirection,
    search: searchValue,
  });

  // const filterdPizza = pizza.filter((pizza) => pizza.title.includes(searchValue.toLowerCase()));
  
  function setCategoryIdHandler(id: number) {
    dispatch(setCategoryId(id))
  }

  if (error) return <h2>Ошибка: {error.message}</h2>;

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId as number}
                    setCategoryId={setCategoryIdHandler} />
        <Sort sortType={sortType}
              setSortType={setSortType}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
            <PizzaBlockSkeleton key={`skeleton-${index}`} />
          ))
          : pizza.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

// type HomeProps = {
//   searchValue: string;
// }