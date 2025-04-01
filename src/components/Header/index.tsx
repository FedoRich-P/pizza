import logoImg from '../../assets/img/pizza-logo.svg';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { SearchInput } from '@components/SearchInput';
import { CartIcon } from '@components/Header/CartIcon';


export function Header () {
  const items = useAppSelector(state => state.cart.items);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const totalPrice  = useAppSelector(state => state.cart.totalPrice);
  return (
    <div className="header">
      <div className="container">
        <NavLink to="/" className="header__logo">
          <img width="38" src={logoImg} alt="Pizza logo" />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </NavLink>
        <SearchInput/>
        <div className="header__cart">
          <NavLink to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <CartIcon />
            <span>{totalCount}</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}