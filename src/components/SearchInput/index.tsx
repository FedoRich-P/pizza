import { FiSearch, FiX } from 'react-icons/fi';
import styles from './SearchInput.module.scss';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../App.tsx';
import { useDebounce } from '../../hooks/useDebounce'; // Импортируем debounce хук

export const SearchInput = () => {
  const { setSearchValue } = useContext(SearchContext);
  const [localSearch, setLocalSearch] = useState('');

  // Дебаунс вводимого текста перед отправкой в глобальный state
  const debouncedSearch = useDebounce(localSearch, 500);

  // Следим за изменением debounced значения и обновляем контекст
  useEffect(() => {
    setSearchValue(debouncedSearch);
  }, [debouncedSearch, setSearchValue]);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setLocalSearch(e.target.value);
  }

  function handleResetInputValue() {
    setLocalSearch('');
    setSearchValue(''); // Сброс поиска
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={localSearch}
        onChange={handleSearchChange}
        placeholder="Поиск пицц..."
        className={styles.input}
      />
      <div className={styles.iconContainer}>
        {localSearch && (
          <FiX
            size={30}
            onClick={handleResetInputValue}
            className="hover:text-red-500 transition-colors pr-2"
          />
        )}
        <FiSearch className={styles.icon} />
      </div>
    </div>
  );
};
