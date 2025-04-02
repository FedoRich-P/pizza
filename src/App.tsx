import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Cart } from '@/pages/Cart';
import { NotFound } from '@/pages/NotFound';
import { FullPizza } from '@/pages/FullPizza';
import { MainLayout } from '@/layouts/MainLayout';


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

// <div className="wrapper">
//   <Header />
//   <div className="content">
//     <div className="container">
//
//     </div>
//   </div>
// </div>

