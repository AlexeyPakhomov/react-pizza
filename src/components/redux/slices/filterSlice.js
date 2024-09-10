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
  },
});

function updateCurrentPage(state) {
  if (state.currentPage !== 1) {
    state.currentPage = 1;
  }
}

export const { setCategoryId, setSort, setSearchValue, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
