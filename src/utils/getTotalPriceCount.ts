import { TCartItem } from '../components/redux/slices/cartSlice';

export const calculateTotalCount = (data: TCartItem[]) =>
  data.reduce((sum, item) => sum + item.count, 0);

export const calculateTotalPrice = (data: TCartItem[]) =>
  data.reduce((sum, item) => sum + item.price * item.count, 0);

export const getTotalPriceCount = (data: TCartItem[]) => {
  const totalPrice = calculateTotalPrice(data);
  const totalCount = calculateTotalCount(data);

  return { totalPrice, totalCount };
};
