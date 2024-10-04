import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectorCart, TCartItem } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, imageUrl, title, types, sizes, price }) => {
  const typesPizza = ['тонкое', 'традиционное'];
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectorCart);
  const totalCount = cartItems.reduce((sum: number, curr: any) => {
    if (curr.id === id) {
      return sum + curr.count;
    } else {
      return sum;
    }
  }, 0);

  function addPizzaCart() {
    const item: TCartItem = {
      id,
      imageUrl,
      title,
      typePizza: typesPizza[activeType],
      size: sizes[activeSize],
      price,
      count: 0,
    };

    dispatch(addItem(item));
  }

  useEffect(() => {
    if (isMounted.current) {
      const data = JSON.stringify(cartItems);
      localStorage.setItem('cartItems', data);
    }

    isMounted.current = true;
  }, [cartItems]);

  return (
    <div className="pizza-block">
      <div className="pizza-block__imageDiv">
        <Link to={`pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
      </div>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type: number) => (
            <li
              key={type}
              onClick={() => {
                setActiveType(type);
              }}
              className={activeType === type ? 'active' : ''}>
              {typesPizza[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size: number, i: number) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={i === activeSize ? 'active' : ''}>
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div className="button button--outline button--add" onClick={() => addPizzaCart()}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>

          {totalCount > 0 && <i>{totalCount}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
