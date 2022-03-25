import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchWithErrorHandling } from '@app/utils';
import { api } from '@app/api';
import { DEFAULT_FETCH_LIMIT } from '@app/variables';
import initialState from './orders.initial-state';

import { Order } from '@app/declarations';
import { RootState } from '@store/index';
import { FetchOrdersParams, PatchOrderParams } from './orders.declarations';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ page, status, accessToken }: FetchOrdersParams) => {
    const statusRestriction = status !== '-1' ? { status } : {};

    const orders: { total: number; data: Order[] } = (
      await axios.get(api.orders, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          $skip: page * DEFAULT_FETCH_LIMIT - DEFAULT_FETCH_LIMIT,
          $order: {
            createdAt: 'DESC',
          },
          ...statusRestriction,
        },
      })
    ).data;

    return {
      total: orders.total,
      orders: orders.data,
    };
  }
);

export const patchOrder = createAsyncThunk(
  'orders/patchOrder',
  async ({ data, accessToken }: PatchOrderParams, { rejectWithValue }) => {
    return await fetchWithErrorHandling(async () => {
      await axios.patch(api.orders + `/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }, rejectWithValue);
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderEdit: (state) => {
      state.editLoading = 'idle';
      state.editSuccess = false;
      state.editError = undefined;
    },
    clearOrderEditError: (state) => {
      state.editError = undefined;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
  },
  extraReducers: {
    [fetchOrders.pending as any]: (state) => {
      state.loading = 'pending';
      state.error = undefined;
    },
    [fetchOrders.fulfilled as any]: (
      state,
      {
        payload: { orders, total },
      }: PayloadAction<{ total: number; orders: Order[] }>
    ) => {
      state.loading = 'idle';
      state.data = orders;
      state.total = total;
    },
    [fetchOrders.rejected as any]: (state, action: PayloadAction<string>) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
    [patchOrder.pending as any]: (state) => {
      state.editLoading = 'pending';
      state.editError = undefined;
      state.editSuccess = false;
    },
    [patchOrder.fulfilled as any]: (state) => {
      state.editLoading = 'idle';
      state.editSuccess = true;
    },
    [patchOrder.rejected as any]: (state, action: PayloadAction<string>) => {
      state.editLoading = 'idle';
      state.editError = action.payload;
    },
  },
});

export const { clearOrderEdit, clearOrderEditError, setPage, setStatusFilter } =
  ordersSlice.actions;

export const selectIsLoading = (state: RootState) =>
  state.orders.loading === 'pending';
export const selectOrders = (state: RootState) => state.orders.data;
export const selectTotal = (state: RootState) => state.orders.total;
export const selectEditSuccess = (state: RootState) => state.orders.editSuccess;
export const selectEditError = (state: RootState) => state.orders.editError;
export const selectPage = (state: RootState) => state.orders.page;
export const selectStatusFilter = (state: RootState) =>
  state.orders.filters.status;

export default ordersSlice.reducer;
