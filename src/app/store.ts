import { configureStore } from '@reduxjs/toolkit'
import { filterReducer } from '../features/filterSlice.ts';
import { cartReducer } from '../features/cartSlice.ts';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch