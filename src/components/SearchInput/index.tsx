import { FiSearch, FiX } from 'react-icons/fi';
import styles from './SearchInput.module.scss';
import { ChangeEvent } from 'react';

export const SearchInput = ({ searchValue, setSearchValue }: SearchInputProps) => {

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleResetInputValue() {
    setSearchValue('');
  }

  return (
    <div className={styles.container}>
      <input type="text"
             value={searchValue}
             onChange={handleSearchChange}
             placeholder="Поиск пицц..."
             className={styles.input} />
      <div className={styles.iconContainer}>
        {searchValue && <FiX size={30}
                             onClick={handleResetInputValue}
                             className="hover:text-red-500 transition-colors pr-2" />}
        <FiSearch className={styles.icon} />
      </div>
    </div>
  );
};

type SearchInputProps = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}