import { FiSearch, FiX } from 'react-icons/fi';
import styles from './SearchInput.module.scss';
import { ChangeEvent, useEffect, useState, memo, useRef } from 'react';
import { useDispatch} from 'react-redux';
import { setSearchValue } from '../../features/filterSlice.ts';
import { useDebounce } from '../../hooks/useDebounce.ts';

export const SearchInput = memo(() => {
  const [localSearch, setLocalSearch] = useState('');
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    dispatch(setSearchValue(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setLocalSearch(e.target.value);
  }

  function handleResetInputValue() {
    setLocalSearch('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus()
  }

  return (
    <div className={styles.container}>
      <input type="text"
             ref={inputRef}
             value={localSearch}
             onChange={handleSearchChange}
             placeholder="Поиск пицц..."
             className={styles.input}
      />
      <div className={styles.iconContainer}>
        {localSearch && (
          <button type="button"
                  onClick={handleResetInputValue}
                  aria-label="Очистить поиск"
                  className="hover:text-red-500 transition-colors pr-2">
            <FiX size={30} />
          </button>
        )}
        <FiSearch className={styles.icon} />
      </div>
    </div>
  );
});