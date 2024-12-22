import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';
import { exchangeCurrency } from '../../service/exchangeAPI';

export const getCurrency = createAsyncThunk(
  'currency/getCurrency',
  async (crd, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { baseCurrency } = state.currency;

      if (baseCurrency && baseCurrency !== 'USD') {
        return thunkAPI.rejectWithValue('We already have base currency!');
      }
      const userInfo = await getUserInfo(crd);
      return userInfo.results[0].annotations.currency.iso_code;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const getExchangeInfo = createAsyncThunk(
  'currency/getExchangeInfo',
  async (request, thunkAPI) => {
    try {
      const exchangeInfo = await exchangeCurrency(request);
      return exchangeInfo;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);
