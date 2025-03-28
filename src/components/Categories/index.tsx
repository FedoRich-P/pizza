import * as React from 'react';
import { useState } from 'react';
import { v4 } from 'uuid';

const categories = [
  { id: v4(), name: 'Все' },
  { id: v4(), name: 'Мясные' },
  { id: v4(), name: 'Вегетарианская' },
  { id: v4(), name: 'Гриль' },
  { id: v4(), name: 'Острые' },
  { id: v4(), name: 'Закрытые' },
];

export const Categories = () => {

  const [activeId, setActiveId] = useState<string>(categories[0].id);

  const handleListClick = (event: React.MouseEvent<HTMLUListElement>) => {
    const liElement = event.target as HTMLLIElement;
    if (liElement.tagName !== 'LI') return;

    const id = liElement.dataset.id;
    if (id) setActiveId(id);
  };

  return (
    <div className="categories">
      <ul onClick={handleListClick}>
        {categories.map(category => (
          <li key={category.id}
              data-id={category.id}
              className={category.id === activeId ? 'active' : ''}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};