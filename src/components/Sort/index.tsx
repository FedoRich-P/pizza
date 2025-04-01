import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';
import { setSortDirection, setSortType } from '../../features/filterSlice.ts';

export const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortType = useSelector<RootState>(state => state.filter.sort.sortType);
  const sortDirection = useSelector<RootState>(state => state.filter.sort.sortDirection);
  const dispatch = useDispatch();

  const togglePopup = () => setIsOpen(!isOpen);

  const handleSortChange = (type: SortType) => {
    if (type === sortType) {
      dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortType(type));
      dispatch(setSortDirection(type === 'price' ? 'desc' : 'asc'));
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
                onClick={() => handleSortChange(key as SortType)}>
                {value} {sortType === key && (sortDirection === 'asc' ? '↑' : '↓')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const SORT_TYPES = {
  rating: 'популярности',
  price: 'цене',
  title: 'алфавиту'
};

export type SortType = keyof typeof SORT_TYPES;
export type SortDirection = 'asc' | 'desc';

// type SortProps = {
//   sortType: string;
//   setSortType: (type: string) => void;
//   sortDirection: 'asc' | 'desc';
//   setSortDirection: (dir: 'asc' | 'desc') => void;
// };