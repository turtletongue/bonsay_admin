import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import initialState from './admins.initial-state';
import { api } from './../../api';
import { DEFAULT_FETCH_LIMIT } from '../../variables';
import { fetchWithErrorHandling } from '../../utils';

import { User } from '../../declarations';
import {
  CreateAdminParams,
  DeleteAdminParams,
  FetchAdminsParams,
} from './admins.declarations';
import { RootState } from '..';

export const fetchAdmins = createAsyncThunk(
  'admins/fetchAdmins',
  async ({ page, accessToken }: FetchAdminsParams) => {
    const admins: { total: number; data: User[] } = (
      await axios.get(api.users, {
        params: {
          $skip: page * DEFAULT_FETCH_LIMIT - DEFAULT_FETCH_LIMIT,
          $order: {
            updatedAt: 'DESC',
          },
          role: {
            $eq: 'admin',
          },
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;

    return {
      total: admins.total,
      admins: admins.data,
    };
  }
);

export const createAdmin = createAsyncThunk(
  'admins/createAdmin',
  async ({ data, accessToken }: CreateAdminParams, { rejectWithValue }) => {
    return await fetchWithErrorHandling(async () => {
      await axios.post(
        api.users,
        { ...data, role: 'admin' },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }, rejectWithValue);
  }
);

export const deleteAdmin = createAsyncThunk(
  'admins/deleteAdmin',
  async ({ adminId, accessToken }: DeleteAdminParams, { rejectWithValue }) => {
    return await fetchWithErrorHandling(async () => {
      await axios.delete(api.users + `/${adminId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }, rejectWithValue);
  }
);

export const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.writeData.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.writeData.password = action.payload;
    },
    setPasswordConfirmation: (state, action: PayloadAction<string>) => {
      state.writeData.passwordConfirmation = action.payload;
    },
    clearAdminCreate: (state) => {
      state.writeData = initialState.writeData;
      state.createLoading = 'idle';
      state.createSuccess = false;
      state.createError = undefined;
    },
    clearAdminCreateError: (state) => {
      state.createError = undefined;
    },
    clearDelete: (state) => {
      state.deleteLoading = 'idle';
      state.deleteSuccess = false;
      state.deleteError = undefined;
    },
    setWriteData: (state, action: PayloadAction<Partial<User>>) => {
      state.writeData = action.payload;
    },
    clearWriteData: (state) => {
      state.writeData = initialState.writeData;
    },
  },
  extraReducers: {
    [fetchAdmins.pending as any]: (state) => {
      state.loading = 'pending';
      state.error = undefined;
    },
    [fetchAdmins.fulfilled as any]: (
      state,
      {
        payload: { admins, total },
      }: PayloadAction<{ total: number; admins: User[] }>
    ) => {
      state.loading = 'idle';
      state.data = admins;
      state.total = total;
    },
    [fetchAdmins.rejected as any]: (state, action: PayloadAction<string>) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
    [createAdmin.pending as any]: (state) => {
      state.createLoading = 'pending';
      state.createError = undefined;
      state.createSuccess = false;
    },
    [createAdmin.fulfilled as any]: (state) => {
      state.createLoading = 'idle';
      state.createSuccess = true;
    },
    [createAdmin.rejected as any]: (state, action: PayloadAction<string>) => {
      state.createLoading = 'idle';
      state.createError = action.payload;
    },
    [deleteAdmin.pending as any]: (state) => {
      state.deleteLoading = 'pending';
      state.deleteError = undefined;
      state.deleteSuccess = false;
    },
    [deleteAdmin.fulfilled as any]: (state) => {
      state.deleteLoading = 'idle';
      state.deleteSuccess = true;
    },
    [deleteAdmin.rejected as any]: (state, action: PayloadAction<string>) => {
      state.deleteLoading = 'idle';
      state.deleteError = action.payload;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setPasswordConfirmation,
  setWriteData,
  clearWriteData,
  clearAdminCreateError,
  clearDelete,
  clearAdminCreate,
} = adminsSlice.actions;

export const selectIsLoading = (state: RootState) =>
  state.admins.loading === 'pending';
export const selectAdmins = (state: RootState) => state.admins.data;
export const selectTotal = (state: RootState) => state.admins.total;
export const selectEmail = (state: RootState) => state.admins.writeData.email;
export const selectPassword = (state: RootState) =>
  state.admins.writeData.password;
export const selectPasswordConfirmation = (state: RootState) =>
  state.admins.writeData.passwordConfirmation;
export const selectCreateSuccess = (state: RootState) =>
  state.admins.createSuccess;
export const selectCreateError = (state: RootState) => state.admins.createError;
export const selectDeleteSuccess = (state: RootState) =>
  state.admins.deleteSuccess;
export const selectDeleteError = (state: RootState) => state.admins.deleteError;

export default adminsSlice.reducer;
