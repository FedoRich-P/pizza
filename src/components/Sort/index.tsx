import { useEffect, useRef, useState } from 'react';

const SORT_TYPES = {
  rating: 'популярности',
  price: 'цене',
  title: 'алфавиту'
};

type SortProps = {
  sortType: string;
  setSortType: (type: string) => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (dir: 'asc' | 'desc') => void;
};

export const Sort = ({
                       sortType,
                       setSortType,
                       sortDirection,
                       setSortDirection
                     }: SortProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => setIsOpen(!isOpen);

  const handleSortChange = (type: string) => {
    if (type === sortType) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortDirection(type === 'price' ? 'desc' : 'asc');
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label" onClick={togglePopup}>
        <b>Сортировка по:</b>
        <span>
          {SORT_TYPES[sortType as keyof typeof SORT_TYPES]}
          {sortDirection === 'asc' ? ' ↑' : ' ↓'}
        </span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {Object.entries(SORT_TYPES).map(([key, value]) => (
              <li key={key}
                className={sortType === key ? 'active' : ''}
                onClick={() => handleSortChange(key)}>
                {value} {sortType === key && (sortDirection === 'asc' ? '↑' : '↓')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};