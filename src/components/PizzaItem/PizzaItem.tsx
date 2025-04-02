import { Pizza } from '@/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { PizzaBlockIcon } from '@components/PizzaBlock/PizzaBlockIcon';
import { NavLink } from 'react-router-dom';

interface PizzaItemProps {
  pizza: Pizza | null;
  count?: number;
  activeType?: number;
  activeSize?: number;
  onTypeChange?: (index: number) => void;
  onSizeChange?: (index: number) => void;
  onAddToCart?: () => void;
}

export const PizzaItem = ({
                            pizza,
                            count = 0,
                            activeType = 0,
                            activeSize = 0,
                            onTypeChange = () => {},
                            onSizeChange = () => {},
                            onAddToCart = () => {},
                          }: PizzaItemProps) => {
  const typesName = ['тонкое', 'традиционное'];

  if (!pizza) {
    return (
      <div className="pizza-block">
        <Skeleton height={155} />
        <h4 className="pizza-block__title"><Skeleton width={150} /></h4>
        <div className="pizza-block__selector">
          <ul><li><Skeleton width={80} /></li></ul>
          <ul><li><Skeleton width={60} /></li></ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price"><Skeleton width={70} /></div>
          <div className="button button--outline button--add">
            <Skeleton width={120} height={45} />
          </div>
        </div>
      </div>
    );
  }

  const { title, price, imageUrl, sizes, types } = pizza;

  return (
    <div className="pizza-block">
      <NavLink to={`/pizza/${pizza.id}`} className={'self-center'}>
        <img className="pizza-block__image" src={imageUrl} alt={`Pizza - ${title}`} />
        <h4 className="pizza-block__title">{title}</h4>
      </NavLink>
      <div className="pizza-block__selector">
        <ul>
          {types?.map((type, index) => (
            <li
              key={index}
              onClick={() => onTypeChange(index)}
              className={activeType === index ? 'active' : ''}
            >
              {typesName[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes?.map((size, index) => (
            <li
              key={index}
              className={activeSize === index ? 'active' : ''}
              onClick={() => onSizeChange(index)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button className="button button--outline button--add" onClick={onAddToCart}>
          <PizzaBlockIcon />
          <span>Добавить</span>
          {count > 0 && <i>{count}</i>}
        </button>
      </div>
    </div>
  );
};