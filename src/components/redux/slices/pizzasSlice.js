import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { category, sortBy } = params;
    const response = await axios.get(
      `https://66d6c751006bfbe2e64e8d5f.mockapi.io/items?${category}&${sortBy}`,
    );

    return response.data;
  },
);

const initialState = {
  pizzaItems: [],
  status: 'loading', // loading | success | error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzaItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.pizzaItems = [];
        state.status = 'loading';
        //console.log(1, state.status);
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzaItems = action.payload;
        state.status = 'success';
        //console.log(2, state.status, state);
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.pizzaItems = [];
        state.status = 'error';
        //console.log(3, state.status);
      });
  },
});
export const selectorPizzas = (state) => state.pizzas;

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
