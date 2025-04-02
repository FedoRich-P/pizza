import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pizza } from '@/types';
import axios from 'axios';
import { BASE_URL } from '@/pages/Home';

type PizzaState = {
  items: Pizza[];
  isLoading: boolean;
  error: string | null;
};

const initialState: PizzaState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string | number>>(
  'pizza/fetchPizzas',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get<Pizza[]>(BASE_URL, { params });

      if (response.data.length === 0) {
        return rejectWithValue('Ничего не найдено');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка запроса');
    }
  }
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export const pizzaReducer = pizzaSlice.reducer;