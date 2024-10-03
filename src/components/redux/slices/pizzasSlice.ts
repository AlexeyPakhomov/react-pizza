import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Status } from '../../../utils/constants';

type IFetchPizzas = {
  category: string;
  sortBy: string;
};

export type TPizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  description: string;
};

interface IPizzaSliceState {
  pizzaItems: TPizzaItem[];
  status: Status;
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params: IFetchPizzas) => {
    const { category, sortBy } = params;
    const response = await axios.get<TPizzaItem[]>(
      `https://66d6c751006bfbe2e64e8d5f.mockapi.io/items?${category}&${sortBy}`,
    );

    return response.data as TPizzaItem[];
  },
);

const initialState: IPizzaSliceState = {
  pizzaItems: [],
  status: Status.LOADING, // loading | success | error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<TPizzaItem[]>) {
      state.pizzaItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.pizzaItems = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzaItems = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.pizzaItems = [];
        state.status = Status.ERROR;
      });
  },
});
export const selectorPizzas = (state: RootState) => state.pizzas;

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
