import { getTotalPriceCount } from './getTotalPriceCount';

export const getCartItemsLS = () => {
  const data = localStorage.getItem('cartItems');
  const item = data ? JSON.parse(data) : [];
  const totalPriceCount = getTotalPriceCount(item);

  return { item, ...totalPriceCount };
};
