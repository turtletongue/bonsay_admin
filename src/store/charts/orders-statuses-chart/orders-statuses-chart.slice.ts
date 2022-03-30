import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { api } from '@app/api';
import initialState from './orders-statuses.initial-state';

import { RootState } from '@store/index';
import {
  FetchOrdersStatusesParams,
  OrderStatusData,
} from './orders-statuses-chart.declarations';

export const fetchOrdersStatusesData = createAsyncThunk(
  'charts/ordersStatusesChart/fetchOrdersStatusesData',
  async ({ startDate, endDate, accessToken }: FetchOrdersStatusesParams) => {
    const data: { statuses: OrderStatusData[] } = (
      await axios.get(api.ordersStatusesChart, {
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
      statuses: data.statuses,
    };
  }
);

export const ordersStatusesChartSlice = createSlice({
  name: 'charts/ordersStatusesChart',
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
    [fetchOrdersStatusesData.pending as any]: (state) => {
      state.loading = 'pending';
      state.error = undefined;
    },
    [fetchOrdersStatusesData.fulfilled as any]: (
      state,
      { payload: { statuses } }: PayloadAction<{ statuses: OrderStatusData[] }>
    ) => {
      state.loading = 'idle';
      state.data = statuses;
    },
    [fetchOrdersStatusesData.rejected as any]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = ordersStatusesChartSlice.actions;

export const selectData = (state: RootState) => state.ordersStatusesChart.data;
export const selectStartDate = (state: RootState) =>
  state.ordersStatusesChart.startDate;
export const selectEndDate = (state: RootState) =>
  state.ordersStatusesChart.endDate;

export default ordersStatusesChartSlice.reducer;
