type DoughType = 0 | 1;
type PizzaSize = 26 | 30 | 40;

export type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  types: DoughType[];
  sizes: PizzaSize[];
  price: number;
  category: number;
  rating: number;
};
