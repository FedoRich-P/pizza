import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pizza } from '@/types';
import { PizzaItem } from '@components/PizzaItem/PizzaItem';
import { BASE_URL } from '@/pages/Home';
import { useAppDispatch } from '@/app/hooks';
import { addProduct } from '@/features/cartSlice';
import { usePizzaLogic } from '@/hooks/usePizzaLogic';

export const FullPizza = () => {
  const dispatch = useAppDispatch();
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const {
    activeType,
    activeSize,
    setActiveType,
    setActiveSize,
    getCartItem,
  } = usePizzaLogic();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get<Pizza>(`${BASE_URL}/${id}`);
        setPizza(data);
      } catch (error) {
        console.error('Ошибка при загрузке пиццы:', error);
        setPizza(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPizza();
  }, [id]);

  const handleAddToCart = () => {
    if (!pizza) return;
    dispatch(addProduct(getCartItem(pizza)));
  };

  if (loading) return <div className="container"><PizzaItem pizza={null} /></div>;
  if (!pizza) return <div className="container">Пицца не найдена</div>;

  return (
    <div className="container max-w-[50%] mx-auto">
      <PizzaItem pizza={pizza}
                 activeType={activeType}
                 activeSize={activeSize}
                 onTypeChange={setActiveType}
                 onSizeChange={setActiveSize}
                 onAddToCart={handleAddToCart}
      />
    </div>
  );
};