import './scss/app.scss';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { BASE_URL, Home } from './pages/Home.tsx';
import { PizzaBlock } from './components/PizzaBlock';
import { useGetPizzas } from './hooks/useGetPizzas.ts';
import { NotFound } from './pages/NotFound.tsx';
import { Cart } from './pages/Cart.tsx';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store.ts';
import { decrement, increment } from './features/filterSlice.ts';

type SearchProps = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

export const SearchContext = createContext({} as SearchProps);

function App() {

  const data = useSelector((state: RootState) => state.filter.value);
 const dispatch = useDispatch();

  console.log(data);

  const { pizza } = useGetPizzas({ url: BASE_URL });
  return (
    <>
      <div className="wrapper">
        <button onClick={() => dispatch(increment())}> + </button>
        <button onClick={() => dispatch(decrement())}> - </button>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza" element={<PizzaBlock {...pizza[0]} />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        {/*</SearchContext.Provider>*/}
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

