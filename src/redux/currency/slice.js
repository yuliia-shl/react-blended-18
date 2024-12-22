import { createSlice } from '@reduxjs/toolkit';
import { getCurrency } from './ops';

const slice = createSlice({
  initialState: {
    baseCurrency: '',
  },
  name: 'currency',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrency.fulfilled, (state, action) => {
      state.baseCurrency = action.payload;
    });
  },
});
export const currencyReducer = slice.reducer;
