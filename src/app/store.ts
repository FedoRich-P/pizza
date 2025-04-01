import { configureStore } from '@reduxjs/toolkit'
import { filterReducer } from '@/features/filterSlice';
import { cartReducer } from '@/features/cartSlice';


export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch