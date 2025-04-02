import { configureStore } from '@reduxjs/toolkit'
import { filterReducer } from '@/features/filterSlice';
import { cartReducer } from '@/features/cartSlice';
import { pizzaReducer } from '@/features/pizzaSlice';


export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch