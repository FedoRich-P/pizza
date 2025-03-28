import logoImg from '../../assets/img/pizza-logo.svg';
import { NavLink } from 'react-router-dom';
import { CartIcon } from './CartIcon.tsx';

export const Header = () => {
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
        <div className="header__cart">
          <NavLink to="/cart" className="button button--cart">
            <span>520 ₽</span>
            <div className="button__delimiter"></div>
            <CartIcon />
            <span>3</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};