import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartItemsLS } from '../../utils/getCartItemsLS';
import { calculateTotalCount, calculateTotalPrice } from '../../utils/getTotalPriceCount';

export type TCartItem = {
  id: string;
  imageUrl: string;
  title: string;
  typePizza: string;
  size: number;
  price: number;
  count: number;
};

export type TChangeQuantityItem = {
  id: string;
  typePizza: string;
  size: number;
};

interface ICartSliceState {
  cartItems: TCartItem[];
  totalPrice: number;
  totalCount: number;
}

const initialState: ICartSliceState = {
  cartItems: getCartItemsLS().item,
  totalPrice: getCartItemsLS().totalPrice,
  totalCount: getCartItemsLS().totalCount,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.cartItems.find((obj) => findItemInArr(obj, action.payload));

      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }

      getTotalPriceCount(state);
    },
    plusItem(state, action: PayloadAction<TChangeQuantityItem>) {
      state.cartItems.forEach((item) => findItemInArr(item, action.payload) && item.count++);

      getTotalPriceCount(state);
    },
    minusItem(state, action: PayloadAction<TChangeQuantityItem>) {
      state.cartItems.forEach((item) => {
        if (findItemInArr(item, action.payload)) {
          return item.count > 1 ? (item.count -= 1) : 1;
        }
      });

      getTotalPriceCount(state);
    },
    removeItem(state, action: PayloadAction<TChangeQuantityItem>) {
      state.cartItems = state.cartItems.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.size !== action.payload.size ||
          item.typePizza !== action.payload.typePizza,
      );

      getTotalPriceCount(state);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

function getTotalPriceCount(state: ICartSliceState) {
  state.totalPrice = calculateTotalPrice(state.cartItems);
  state.totalCount = calculateTotalCount(state.cartItems);
}

function findItemInArr(obj: TCartItem, payload: TChangeQuantityItem) {
  return obj.id === payload.id && obj.size === payload.size && obj.typePizza === payload.typePizza;
}

export const selectorCart = (state: RootState) => state.cart;

export const { addItem, removeItem, plusItem, minusItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
