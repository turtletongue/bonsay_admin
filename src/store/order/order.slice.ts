import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { api } from '@app/api';
import initialState from './order.initial-state';

import { Order } from '@app/declarations';
import { RootState } from '@store/index';
import { FetchOrderParams } from './order.declarations';

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async ({ id, accessToken }: FetchOrderParams) => {
    const order: { data: Order } = (
      await axios.get(api.orders + `/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;

    return {
      order,
    };
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrder.pending as any]: (state) => {
      state.loading = 'pending';
      state.error = undefined;
    },
    [fetchOrder.fulfilled as any]: (
      state,
      { payload: { order } }: PayloadAction<{ order: Order }>
    ) => {
      state.loading = 'idle';
      state.data = order;
    },
    [fetchOrder.rejected as any]: (state, action: PayloadAction<string>) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
  },
});

export const selectIsLoading = (state: RootState) =>
  state.order.loading === 'pending';
export const selectOrder = (state: RootState) => state.order.data;

export default orderSlice.reducer;
