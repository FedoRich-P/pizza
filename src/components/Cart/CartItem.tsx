import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { CartItemType } from '@/features/cartSlice';

type CartItemProps = {
  item: CartItemType;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
};

export const CartItem = ({ item, onDecrement, onIncrement, onRemove }: CartItemProps) => (
  <div className="cart__item">
    <div className="cart__item-img">
      <img className="pizza-block__image" src={item.imageUrl} alt={item.title} />
    </div>
    <div className="cart__item-info">
      <h3>{item.title}</h3>
      <p>{item.selectedType} тесто, {item.selectedSize} см.</p>
    </div>
    <div className="cart__item-count">
      <button onClick={onDecrement} className="button button--outline button--circle cart__item-count-minus">
        <FiMinus size={16} />
      </button>
      <b>{item.count}</b>
      <button onClick={onIncrement} className="button button--outline button--circle cart__item-count-plus">
        <FiPlus size={16} />
      </button>
    </div>
    <div className="cart__item-price">
      <b>{item.price * item.count} ₽</b>
    </div>
    <div className="cart__item-remove">
      <button onClick={onRemove} className="button button--outline button--circle">
        <FiX size={20} style={{ color: 'red' }} />
      </button>
    </div>
  </div>
);