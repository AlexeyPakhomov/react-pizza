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
      const findItem = state.cartItems.find(
        (obj) => obj.id === action.payload.id,
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calculateTotalPrice(state.cartItems);
      state.totalCount = calculateTotalCount(state.cartItems);
    },
    plusItem(state, action) {
      state.cartItems.forEach(
        (item) => item.id === action.payload && item.count++,
      );

      state.totalPrice = calculateTotalPrice(state.cartItems);
      state.totalCount = calculateTotalCount(state.cartItems);
    },
    minusItem(state, action) {
      state.cartItems.forEach((item) => {
        if (item.id === action.payload) {
          return item.count >= 1 ? (item.count -= 1) : 0;
        }
      });

      state.totalPrice = calculateTotalPrice(state.cartItems);
      state.totalCount = calculateTotalCount(state.cartItems);
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );

      state.totalPrice = calculateTotalPrice(state.cartItems);
      state.totalCount = calculateTotalCount(state.cartItems);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

function calculateTotalPrice(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
}
function calculateTotalCount(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.count, 0);
}

export const { addItem, removeItem, plusItem, minusItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
