import { createSlice } from '@reduxjs/toolkit';
import { getCurrency } from './ops';

const slice = createSlice({
  initialState: {
    baseCurrency: '',
  },
  name: 'currency',
  reducers: {
    setDefaultCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCurrency.fulfilled, (state, action) => {
      state.baseCurrency = action.payload;
    });
  },
});
export const currencyReducer = slice.reducer;
export const { setDefaultCurrency } = slice.actions;
