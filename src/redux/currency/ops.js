import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';

export const getCurrency = createAsyncThunk(
  'currency/getCurrency',
  async (crd, thunkAPI) => {
    try {
      const userInfo = await getUserInfo(crd);
      return userInfo.results[0].annotations.currency.iso_code;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);
