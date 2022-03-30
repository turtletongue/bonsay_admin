import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { api } from '@app/api';
import initialState from './revenue-chart.initial-state';

import { RootState } from '@store/index';
import {
  FetchRevenueDataParams,
  RevenueData,
} from './revenue-chart.declarations';

export const fetchRevenueData = createAsyncThunk(
  'charts/revenueChart/fetchRevenueData',
  async ({ startDate, endDate, accessToken }: FetchRevenueDataParams) => {
    const data: { dates: RevenueData[] } = (
      await axios.get(api.revenueChart, {
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
      dates: data.dates,
    };
  }
);

export const revenueChartSlice = createSlice({
  name: 'charts/revenueChart',
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
    [fetchRevenueData.pending as any]: (state) => {
      state.loading = 'pending';
      state.error = undefined;
    },
    [fetchRevenueData.fulfilled as any]: (
      state,
      { payload: { dates } }: PayloadAction<{ dates: RevenueData[] }>
    ) => {
      state.loading = 'idle';
      state.data = dates;
    },
    [fetchRevenueData.rejected as any]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = revenueChartSlice.actions;

export const selectData = (state: RootState) => state.revenueChart.data;
export const selectStartDate = (state: RootState) =>
  state.revenueChart.startDate;
export const selectEndDate = (state: RootState) => state.revenueChart.endDate;

export default revenueChartSlice.reducer;
