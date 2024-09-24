import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Status } from '../../../utils/constants';

type IFetchPizzas = {
  category: string;
  sortBy: string;
};

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

type TPizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

interface IPizzaSliceState {
  pizzaItems: TPizzaItem[];
  status: Status;
}

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
        //console.log(1, state.status);
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzaItems = action.payload;
        state.status = Status.SUCCESS;
        //console.log(2, state.status, state);
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.pizzaItems = [];
        state.status = Status.ERROR;
        //console.log(3, state.status);
      });
  },
});
export const selectorPizzas = (state: RootState) => state.pizzas;

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
