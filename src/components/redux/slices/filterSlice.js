import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategoryId: 0,
  selectedSort: {
    title: 'Популярности',
    sortBy: 'rating',
    order: 'desc',
  },
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.selectedCategoryId = action.payload;
    },
    setSort(state, action) {
      state.selectedSort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
