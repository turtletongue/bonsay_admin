import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { api } from '@app/api';
import initialState from './orders-count-chart.initial-state';

import { RootState } from '@store/index';
import {
  FetchOrdersCountDataParams,
  OrdersCountData,
} from './orders-count-chart.declarations';

export const fetchOrdersCountData = createAsyncThunk(
  'charts/ordersCountChart/fetchOrdersCountData',
  async ({ startDate, endDate, accessToken }: FetchOrdersCountDataParams) => {
    const data: { dates: OrdersCountData[] } = (
      await axios.get(api.ordersCountChart, {
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

export const ordersCountChartSlice = createSlice({
  name: 'charts/ordersCountChart',
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
    [fetchOrdersCountData.pending as any]: (state) => {
      state.loading = 'pending';
      state.error = undefined;
    },
    [fetchOrdersCountData.fulfilled as any]: (
      state,
      { payload: { dates } }: PayloadAction<{ dates: OrdersCountData[] }>
    ) => {
      state.loading = 'idle';
      state.data = dates;
    },
    [fetchOrdersCountData.rejected as any]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = ordersCountChartSlice.actions;

export const selectData = (state: RootState) => state.ordersCountChart.data;
export const selectStartDate = (state: RootState) =>
  state.ordersCountChart.startDate;
export const selectEndDate = (state: RootState) =>
  state.ordersCountChart.endDate;

export default ordersCountChartSlice.reducer;
