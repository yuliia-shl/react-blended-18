import { createSlice } from '@reduxjs/toolkit';
import { getCurrency, getExchangeInfo } from './ops';

const slice = createSlice({
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: null,
  },
  name: 'currency',
  reducers: {
    setDefaultCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(getExchangeInfo.fulfilled, (state, action) => {
        state.exchangeInfo = action.payload;
      });
  },
});
export const currencyReducer = slice.reducer;
export const { setDefaultCurrency } = slice.actions;
