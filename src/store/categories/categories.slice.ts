import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { api } from '@app/api';
import { fetchWithErrorHandling } from '@app/utils';
import initialState from './categories.initial-state';

import { RootState } from '@store/index';
import { Category, Id } from '@app/declarations';
import {
  CreateCategoryParams,
  DeleteCategoryParams,
  PatchCategoryParams,
} from './categories.declarations';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const categories: { data: Category[] } = (
      await axios.get(api.categories, {
        params: {
          $order: {
            updatedAt: 'DESC',
          },
        },
      })
    ).data;

    return categories.data.map((category) =>
      category.upload ? { ...category, path: category.upload?.path } : category
    );
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (
    { categoryId, accessToken }: DeleteCategoryParams,
    { rejectWithValue }
  ) => {
    return await fetchWithErrorHandling(async () => {
      await axios.delete(api.categories + `/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }, rejectWithValue);
  }
);

export const patchCategory = createAsyncThunk(
  'categories/patchCategory',
  async ({ data, accessToken }: PatchCategoryParams, { rejectWithValue }) => {
    return await fetchWithErrorHandling(async () => {
      await axios.patch(
        api.categories + `/${data.id}`,
        { ...data, upload: undefined },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }, rejectWithValue);
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async ({ data, accessToken }: CreateCategoryParams, { rejectWithValue }) => {
    const uploadId = data.uploadId === -1 ? undefined : data.uploadId;

    return await fetchWithErrorHandling(async () => {
      await axios.post(
        api.categories,
        { ...data, uploadId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }, rejectWithValue);
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.writeData.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.writeData.description = action.payload;
    },
    setUploadId: (state, action: PayloadAction<Id>) => {
      state.writeData.uploadId = action.payload;
    },
    clearCategoryCreate: (state) => {
      state.writeData = initialState.writeData;
      state.createLoading = 'idle';
      state.createSuccess = false;
      state.createError = undefined;
    },
    clearCategoryCreateError: (state) => {
      state.createError = undefined;
    },
    clearDelete: (state) => {
      state.deleteLoading = 'idle';
      state.deleteSuccess = false;
      state.deleteError = undefined;
    },
    clearCategoryEdit: (state) => {
      state.writeData = initialState.writeData;
      state.editLoading = 'idle';
      state.editSuccess = false;
      state.editError = undefined;
    },
    clearCategoryEditError: (state) => {
      state.editError = undefined;
    },
    setWriteData: (state, action: PayloadAction<Partial<Category>>) => {
      state.writeData = action.payload;
    },
    clearWriteData: (state) => {
      state.writeData = initialState.writeData;
    },
  },
  extraReducers: {
    [fetchCategories.pending as any]: (state) => {
      state.loading = 'pending';
      state.error = undefined;
    },
    [fetchCategories.fulfilled as any]: (
      state,
      action: PayloadAction<Category[]>
    ) => {
      state.loading = 'idle';
      state.data = action.payload;
    },
    [fetchCategories.rejected as any]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
    [createCategory.pending as any]: (state) => {
      state.createLoading = 'pending';
      state.createError = undefined;
      state.createSuccess = false;
    },
    [createCategory.fulfilled as any]: (state) => {
      state.createLoading = 'idle';
      state.createSuccess = true;
    },
    [createCategory.rejected as any]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.createLoading = 'idle';
      state.createError = action.payload;
    },
    [deleteCategory.pending as any]: (state) => {
      state.deleteLoading = 'pending';
      state.deleteError = undefined;
      state.deleteSuccess = false;
    },
    [deleteCategory.fulfilled as any]: (state) => {
      state.deleteLoading = 'idle';
      state.deleteSuccess = true;
    },
    [deleteCategory.rejected as any]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.deleteLoading = 'idle';
      state.deleteError = action.payload;
    },
    [patchCategory.pending as any]: (state) => {
      state.editLoading = 'pending';
      state.editError = undefined;
      state.editSuccess = false;
    },
    [patchCategory.fulfilled as any]: (state) => {
      state.editLoading = 'idle';
      state.editSuccess = true;
    },
    [patchCategory.rejected as any]: (state, action: PayloadAction<string>) => {
      state.editLoading = 'idle';
      state.editError = action.payload;
    },
  },
});

export const {
  setName,
  setDescription,
  setUploadId,
  clearCategoryCreate,
  clearCategoryCreateError,
  clearWriteData,
  clearDelete,
  clearCategoryEdit,
  clearCategoryEditError,
  setWriteData,
} = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories.data;
export const selectIsLoading = (state: RootState) =>
  state.categories.loading !== 'idle';
export const selectName = (state: RootState) => state.categories.writeData.name;
export const selectDescription = (state: RootState) =>
  state.categories.writeData.description;
export const selectUploadId = (state: RootState) =>
  state.categories.writeData.uploadId;
export const selectCreateSuccess = (state: RootState) =>
  state.categories.createSuccess;
export const selectCreateError = (state: RootState) =>
  state.categories.createError;
export const selectDeleteSuccess = (state: RootState) =>
  state.categories.deleteSuccess;
export const selectDeleteError = (state: RootState) =>
  state.categories.deleteError;
export const selectEditSuccess = (state: RootState) =>
  state.categories.editSuccess;
export const selectEditError = (state: RootState) => state.categories.editError;

export default categoriesSlice.reducer;
