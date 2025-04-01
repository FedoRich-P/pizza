import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pizza } from '@/types';

export type CartItemType = Omit<Pizza, 'rating' | 'category' | 'types' | 'sizes'> & {
  count: number;
  selectedType: string;
  selectedSize: number;
};

export type CartState = {
  totalPrice: number;
  items: CartItemType[];
};

const initialState: CartState = {
  totalPrice: 0,
  items: [],
};

const calculateTotalPrice = (items: CartItemType[]) =>
  items.reduce((sum, item) => sum + (item.price * item.count), 0);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<CartItemType, 'count'>>) => {
      const { id, selectedType, selectedSize } = action.payload;

      const existingItem = state.items.find(item =>
        item.id === id &&
        item.selectedType === selectedType &&
        item.selectedSize === selectedSize
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calculateTotalPrice(state.items);
    },

    removeProduct: (state, action: PayloadAction<{id: number, selectedType: string, selectedSize: number}>) => {
      const { id, selectedType, selectedSize } = action.payload;
      state.items = state.items.filter(item =>
        !(item.id === id &&
          item.selectedType === selectedType &&
          item.selectedSize === selectedSize)
      );
      state.totalPrice = calculateTotalPrice(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },

    incrementCount: (state, action: PayloadAction<{id: number, selectedType: string, selectedSize: number}>) => {
      const { id, selectedType, selectedSize } = action.payload;
      const item = state.items.find(item =>
        item.id === id &&
        item.selectedType === selectedType &&
        item.selectedSize === selectedSize
      );

      if (item) {
        item.count += 1;
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },

    decrementCount: (state, action: PayloadAction<{id: number, selectedType: string, selectedSize: number}>) => {
      const { id, selectedType, selectedSize } = action.payload;
      const item = state.items.find(item =>
        item.id === id &&
        item.selectedType === selectedType &&
        item.selectedSize === selectedSize
      );

      if (item) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          state.items = state.items.filter(i =>
            !(i.id === id &&
              i.selectedType === selectedType &&
              i.selectedSize === selectedSize)
          );
        }
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearCart,
  incrementCount,
  decrementCount,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;