import { useState } from 'react';
import { Pizza } from '@/types';

export const usePizzaLogic = () => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const typesName = ['тонкое', 'традиционное'];

  const getCartItem = (pizza: Pizza) => ({
    ...pizza,
    selectedType: typesName[activeType],
    selectedSize: pizza.sizes[activeSize],
  });

  return {
    activeType,
    activeSize,
    setActiveType,
    setActiveSize,
    getCartItem,
    typesName,
  };
};