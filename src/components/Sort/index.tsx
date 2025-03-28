import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { SortIcon } from './SortIcon.tsx';

export const Sort = () => {
  const [isOpenPopap, setIsOpenPopap] = useState(false);
  const [activeType, setActiveType] = useState<SortType>(SORT_TYPES.POPULAR);
  const sortRef = useRef<HTMLDivElement>(null);

  function handleTooglePopap() {
    setIsOpenPopap(prev => !prev);
  }

  function handleChangeType(event: React.MouseEvent<HTMLElement>) {
    const target = event.target as HTMLLIElement;
    if (target.tagName === 'LI') {
      setActiveType(target.dataset.value as SortType);
      setIsOpenPopap(false);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsOpenPopap(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <SortIcon />
        <b>Сортировка по:</b>
        <span onClick={handleTooglePopap}>{activeType}</span>
      </div>
      {isOpenPopap &&
        <div className="sort__popup">
          <ul onClick={handleChangeType}>
            {
              Object.values(SORT_TYPES).map((type) => (
                <li key={type} className={activeType === type ? 'active' : ''}
                    data-value={type}>
                  {type}
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  );
};

const SORT_TYPES = {
  POPULAR: 'популярности',
  PRICE: 'цене',
  ALPHABET: 'алфавиту',
} as const;

type SortType = typeof SORT_TYPES[keyof typeof SORT_TYPES];


{/*<li className={activeType === SORT_TYPES.POPULAR ? 'active' : ''}*/}
{/*    data-value={SORT_TYPES.POPULAR}>*/}
{/*  {SORT_TYPES.POPULAR}*/}
{/*</li>*/}
{/*<li className={activeType === SORT_TYPES.PRICE ? 'active' : ''}*/}
{/*    data-value={SORT_TYPES.PRICE}>*/}
{/*  {SORT_TYPES.PRICE}*/}
{/*</li>*/}
{/*<li className={activeType === SORT_TYPES.ALPHABET ? 'active' : ''}*/}
{/*    data-value={SORT_TYPES.ALPHABET}>*/}
{/*  {SORT_TYPES.ALPHABET}*/}
{/*</li>*/}