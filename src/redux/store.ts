import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import pizzasReducer from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
