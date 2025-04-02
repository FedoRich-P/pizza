import { useState } from 'react';
import { addProduct } from '@/features/cartSlice';
import { Pizza } from '@/types';
import { useAppDispatch } from '@/app/hooks';
import { PizzaItem } from '@components/PizzaItem/PizzaItem';

export const PizzaBlock = (props: Pizza) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const handleAddToCart = () => {
    const typesName = ['тонкое', 'традиционное'];
    dispatch(addProduct({
      ...props,
      selectedType: typesName[activeType],
      selectedSize: props.sizes[activeSize],
    }));
    setCount(prev => prev + 1);
  };

  return (
    <PizzaItem pizza={props}
               count={count}
               activeType={activeType}
               activeSize={activeSize}
               onTypeChange={setActiveType}
               onSizeChange={setActiveSize}
               onAddToCart={handleAddToCart}
    />
  );
};

// import { useState } from 'react';
// import { addProduct } from '@/features/cartSlice';
// import { Pizza } from '@/types';
// import { useAppDispatch } from '@/app/hooks';
// import { PizzaBlockIcon } from '@components/PizzaBlock/PizzaBlockIcon';
//
// export const PizzaBlock = (props: Pizza) => {
//   const dispatch = useAppDispatch();
//   const [count, setCount] = useState(0);
//   const [activeType, setActiveType] = useState<number>(0);
//   const [activeSize, setActiveSize] = useState<number>(0);
//
//   const typesName = ['тонкое', 'традиционное'];
//   const {id, title, price, imageUrl, sizes, types } = props;
//
//   const changeActiveType = (index: number) => {
//     setActiveType(index);
//   };
//
//   const changeActiveSize = (index: number) => {
//     setActiveSize(index);
//   };
//
//   const handleClickCount = () => {
//     const item = {
//       id,
//       title,
//       price,
//       imageUrl,
//       selectedType: typesName[activeType],
//       selectedSize: sizes[activeSize],
//     };
//     dispatch(addProduct(item));
//     setCount(count => count + 1);
//   };
//
//   return (
//     <div className="pizza-block">
//       <img className="pizza-block__image"
//            src={imageUrl}
//            alt={`Pizza - ${title}`} />
//       <h4 className="pizza-block__title">{title}</h4>
//       <div className="pizza-block__selector">
//         <ul>
//           {types?.map((type, index) => (
//             <li key={index}
//                 onClick={() => changeActiveType(index)}
//                 className={activeType === index ? 'active' : ''}>
//               {typesName[type]}
//             </li>
//           ))}
//         </ul>
//         <ul>
//           {sizes?.map((size, index) => (
//             <li key={index}
//                 className={activeSize === index ? 'active' : ''}
//                 onClick={() => changeActiveSize(index)}>
//               {size} см.</li>
//           ))}
//         </ul>
//       </div>
//       <div className="pizza-block__bottom">
//         <div className="pizza-block__price">от {price} ₽</div>
//         <button className="button button--outline button--add" onClick={handleClickCount}>
//           <PizzaBlockIcon/>
//           <span>Добавить</span>
//           <i>{count}</i>
//         </button>
//       </div>
//     </div>
//   );
// };