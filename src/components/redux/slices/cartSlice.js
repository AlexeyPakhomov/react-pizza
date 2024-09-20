import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.cartItems.find((obj) =>
        findItemInArr(obj, action.payload),
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }

      getTotalPriceCount(state);
    },
    plusItem(state, action) {
      state.cartItems.forEach(
        (item) => findItemInArr(item, action.payload) && item.count++,
      );

      getTotalPriceCount(state);
    },
    minusItem(state, action) {
      state.cartItems.forEach((item) => {
        if (findItemInArr(item, action.payload)) {
          return item.count >= 1 ? (item.count -= 1) : 0;
        }
      });

      getTotalPriceCount(state);
    },
    removeItem(state, action) {
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

function getTotalPriceCount(state) {
  state.totalPrice = calculateTotalPrice(state.cartItems);
  state.totalCount = calculateTotalCount(state.cartItems);
}

function findItemInArr(obj, payload) {
  return (
    obj.id === payload.id &&
    obj.size === payload.size &&
    obj.typePizza === payload.typePizza
  );
}

function calculateTotalPrice(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
}
function calculateTotalCount(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.count, 0);
}

export const selectorCart = (state) => state.cart;

export const { addItem, removeItem, plusItem, minusItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
