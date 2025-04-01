import { FiChevronLeft, FiCreditCard } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

type CartControlsProps = {
  totalCount: number;
  totalPrice: number;
  hasItems: boolean;
};

export const CartControls = ({ totalCount, totalPrice, hasItems }: CartControlsProps) => (
  <div className="cart__bottom">
    <div className="cart__bottom-details">
      <span>Всего пицц: <b>{totalCount} шт.</b></span>
      <span>Сумма заказа: <b>{totalPrice} ₽</b></span>
    </div>
    <div className="cart__bottom-buttons">
      <NavLink to="/" className="button button--outline button--add go-back-btn">
        <FiChevronLeft size={16} style={{ marginRight: 5 }} />
        <span>Вернуться назад</span>
      </NavLink>
      <button className="button pay-btn" disabled={!hasItems}>
        <span>Оплатить сейчас</span>
        <FiCreditCard size={18} style={{ marginLeft: 8 }} />
      </button>
    </div>
  </div>
);