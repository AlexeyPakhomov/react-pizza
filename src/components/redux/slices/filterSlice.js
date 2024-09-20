import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategoryId: 0,
  selectedSort: {
    title: 'Популярности',
    sortBy: 'rating',
    order: 'desc',
  },
  searchValue: '',
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.selectedCategoryId = action.payload;
      state.searchValue = '';
      updateCurrentPage(state);
    },
    setSort(state, action) {
      state.selectedSort = action.payload;
      updateCurrentPage(state);
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
      updateCurrentPage(state);
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilter(state, action) {
      state.selectedCategoryId = +action.payload.selectedCategoryId;
      state.selectedSort = action.payload.selectedSort;
      state.currentPage = +action.payload.currentPage;
    },
  },
});

function updateCurrentPage(state) {
  if (state.currentPage !== 1) {
    state.currentPage = 1;
  }
}

export const selectorFilter = (state) => state.filter;

export const {
  setCategoryId,
  setSort,
  setSearchValue,
  setCurrentPage,
  setFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
