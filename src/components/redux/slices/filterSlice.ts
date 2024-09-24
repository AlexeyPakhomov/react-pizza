import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TSortItem } from '../../../utils/constants';

type TSelectSort = {
  title: string;
  sortBy: string;
  order: string;
};

interface IFilterSliceState {
  selectedCategoryId: number;
  selectedSort: TSelectSort;
  searchValue?: string;
  currentPage: number;
}

const initialState: IFilterSliceState = {
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.selectedCategoryId = action.payload;
      state.searchValue = '';
      updateCurrentPage(state);
    },
    setSort(state, action: PayloadAction<TSortItem>) {
      state.selectedSort = action.payload;
      updateCurrentPage(state);
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
      updateCurrentPage(state);
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilter(state, action: PayloadAction<IFilterSliceState>) {
      state.selectedCategoryId = +action.payload.selectedCategoryId;
      state.selectedSort = action.payload.selectedSort;
      state.currentPage = +action.payload.currentPage;
    },
  },
});

function updateCurrentPage(state: IFilterSliceState) {
  if (state.currentPage !== 1) {
    state.currentPage = 1;
  }
}

export const selectorFilter = (state: RootState) => state.filter;

export const {
  setCategoryId,
  setSort,
  setSearchValue,
  setCurrentPage,
  setFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
