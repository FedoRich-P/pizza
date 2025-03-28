import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlockSkeleton } from '../components/PizzaBlock/PizzaBlockSkeleton.tsx';
import { PizzaBlock } from '../components/PizzaBlock';
import { useGetPizzas } from '../hooks/useGetPizzas.ts';


export const Home = () => {
  const { pizza, isLoading, error } = useGetPizzas('https://67e65f996530dbd3110fb55d.mockapi.io/items');

  if (error) return <h2>Ошибка: {error.message}</h2>;
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? (Array.from({ length: 8 }).map((_, index) => <PizzaBlockSkeleton key={`skeleton-${index}`} />))
          : (pizza.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
          )}
      </div>
    </>
  );
};