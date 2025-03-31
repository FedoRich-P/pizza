const CATEGORIES = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Мясные' },
  { id: 2, name: 'Вегетарианская' },
  { id: 3, name: 'Гриль' },
  { id: 4, name: 'Острые' },
  { id: 5, name: 'Закрытые' },
];

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (id: number) => void;
};

export const Categories = ({ categoryId, setCategoryId }: CategoriesProps) => {
  const handleCategoryClick = (id: number) => {
    setCategoryId(id);
  };

  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map(category => (
          <li key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={category.id === categoryId ? 'active' : ''}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};