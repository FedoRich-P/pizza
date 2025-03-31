import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CounterState = {
  categoryId: number;
  sort: {
    name: string;
    sortProperty: string
  }
}

const initialState: CounterState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number >) {
      state.categoryId = action.payload;
    }
  },
})

export const { setCategoryId } = filterSlice.actions

export const filterReducer = filterSlice.reducer