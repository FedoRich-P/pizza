export type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  category: number;
  quantity?: number;
};

export const CATEGORIES = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Мясные' },
  { id: 2, name: 'Вегетарианская' },
  { id: 3, name: 'Гриль' },
  { id: 4, name: 'Острые' },
  { id: 5, name: 'Закрытые' },
] as const;

export type CategoriesType = typeof CATEGORIES[number]['id'];

export const SORT_OPTIONS = {
  rating: 'популярности',
  price: 'цене',
  title: 'алфавиту'
} as const;

export type SortType = keyof typeof SORT_OPTIONS;
export type SortDirection = 'asc' | 'desc';

export type SortParams = {
  type: SortType;
  direction: SortDirection;
};