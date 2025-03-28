import './scss/app.scss';
import { Categories } from './components/Categories';
import { useGetPizzas } from './hooks/useGetPizzas.ts';
import { Header } from './components/Header';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock';
import { PizzaBlockSkeleton } from './components/PizzaBlock/PizzaBlockSkeleton.tsx';

function App() {
  const { pizza, isLoading, error } = useGetPizzas('https://67e65f996530dbd3110fb55d.mockapi.io/items');

  if (error) return <h2>Ошибка: {error.message}</h2>;

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// const [pizza, setPizza] = useState<Pizza[]>([]);
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState<Error | null>(null);
//
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const result = await axios.get<Pizza[]>('https://67e65f996530dbd3110fb55d.mockapi.io/items');
//       setPizza(result.data);
//     } catch (error) {
//       if (error instanceof Error) setError(error);
//       console.error('Fetch error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   fetchData();
// }, []);

