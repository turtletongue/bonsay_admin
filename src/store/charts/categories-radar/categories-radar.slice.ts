import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { api } from '@app/api';
import initialState from './categories-radar.initial-state';

import { RootState } from '@store/index';
import {
  FetchCategoriesRadarParams,
  CategoriesRadarData,
} from './categories-radar.declarations';

export const fetchCategoriesRadarData = createAsyncThunk(
  'charts/categoriesRadar/fetchCategoriesRadarData',
  async ({ startDate, endDate, accessToken }: FetchCategoriesRadarParams) => {
    const data: { categories: CategoriesRadarData[] } = (
      await axios.get(api.categoriesRadar, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          startDate,
          endDate,
        },
      })
    ).data;

    return {
      categories: data.categories,
    };
  }
);

export const categoriesRadarSlice = createSlice({
  name: 'charts/categoriesRadar',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<Date | undefined>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date | undefined>) => {
      state.endDate = action.payload;
    },
  },
  extraReducers: {
    [fetchCategoriesRadarData.pending as any]: (state) => {
      state.loading = 'pending';
      state.error = undefined;
    },
    [fetchCategoriesRadarData.fulfilled as any]: (
      state,
      {
        payload: { categories },
      }: PayloadAction<{ categories: CategoriesRadarData[] }>
    ) => {
      state.loading = 'idle';
      state.data = categories;
    },
    [fetchCategoriesRadarData.rejected as any]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = categoriesRadarSlice.actions;

export const selectData = (state: RootState) => state.categoriesRadar.data;
export const selectStartDate = (state: RootState) =>
  state.categoriesRadar.startDate;
export const selectEndDate = (state: RootState) =>
  state.categoriesRadar.endDate;

export default categoriesRadarSlice.reducer;
