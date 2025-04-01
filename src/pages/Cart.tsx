import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearCart, decrementCount, incrementCount, removeProduct } from '@/features/cartSlice';
import { CartItem } from '@components/Cart/CartItem';
import { CartEmpty } from '@components/Cart/CartEmpty';
import { CartControls } from '@components/Cart/CartControls';

export function Cart() {
  const { items, totalPrice } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const handleClearCart = () => dispatch(clearCart());

  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
              <FiShoppingCart size={20} style={{ marginRight: 10 }} />
              Корзина
            </h2>
            {items.length > 0 && (
              <button className="cart__clear" onClick={handleClearCart}>
                <FiTrash2 size={18} style={{ marginRight: 5 }} />
                <span>Очистить корзину</span>
              </button>
            )}
          </div>

          <div className="cart__items">
            {items.length > 0 ? (
              items.map((item) => (
                <CartItem key={`${item.id}_${item.selectedType}_${item.selectedSize}`}
                          item={item}
                          onDecrement={() => dispatch(decrementCount({
                            id: item.id,
                            selectedType: item.selectedType,
                            selectedSize: item.selectedSize,
                          }))}
                          onIncrement={() => dispatch(incrementCount({
                            id: item.id,
                            selectedType: item.selectedType,
                            selectedSize: item.selectedSize,
                          }))}
                          onRemove={() => dispatch(removeProduct({
                            id: item.id,
                            selectedType: item.selectedType,
                            selectedSize: item.selectedSize,
                          }))}
                />
              ))
            ) : (
              <CartEmpty />
            )}
          </div>

          <CartControls totalCount={totalCount}
                        totalPrice={totalPrice}
                        hasItems={items.length > 0}
          />
        </div>
      </div>
    </div>
  );
}