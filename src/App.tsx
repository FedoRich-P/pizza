import './scss/app.scss';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { PizzaBlock } from './components/PizzaBlock';
import { useGetPizzas } from './hooks/useGetPizzas.ts';
import { NotFound } from './pages/NotFound.tsx';
import { Cart } from './pages/Cart.tsx';

function App() {

  const { pizza } = useGetPizzas('https://67e65f996530dbd3110fb55d.mockapi.io/items');
  return (
    <>

      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza" element={<PizzaBlock {...pizza[0]} />} />
              <Route path="/*" element={<NotFound/>} />
            </Routes>
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

