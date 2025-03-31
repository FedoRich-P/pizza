import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = filterSlice.actions

export const filterReducer = filterSlice.reducer