import './scss/app.scss';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { BASE_URL, Home } from './pages/Home.tsx';
import { PizzaBlock } from './components/PizzaBlock';
import { useGetPizzas } from './hooks/useGetPizzas.ts';
import { NotFound } from './pages/NotFound.tsx';
import { Cart } from './pages/Cart.tsx';
import { createContext } from 'react';

type SearchProps = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

export const SearchContext = createContext({} as SearchProps);

function App() {
  const { pizza } = useGetPizzas({ url: BASE_URL });
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
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

