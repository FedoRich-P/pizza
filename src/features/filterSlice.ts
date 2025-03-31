import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from '../components/Sort';
import { SortDirection } from '../types/types.ts';

export type CounterState = {
  categoryId: number;
  sort: {
    sortType: SortType;
    sortDirection: SortDirection
  },
  search: string;
}

const initialState: CounterState = {
  categoryId: 0,
  sort: {
    sortType: 'rating',
    sortDirection: 'desc',
  },
  search: '',
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sort.sortType = action.payload;
    },
    setSortDirection(state, action: PayloadAction<SortDirection>) {
      state.sort.sortDirection = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.search = action.payload;
    }
  },
})

export const { setCategoryId, setSortType, setSortDirection, setSearchValue } = filterSlice.actions

export const filterReducer = filterSlice.reducer