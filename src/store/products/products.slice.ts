import { Id } from './../../declarations.d';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import initialState from './products.initial-state';
import { api, API_URL } from './../../api';
import { DEFAULT_FETCH_LIMIT } from '../../variables';
import { fetchWithErrorHandling } from '../../utils';

import { Product } from '../../declarations';
import {
  CreateProductParams,
  DeleteProductParams,
  FetchProductsParams,
} from './products.declarations';
import { RootState } from '..';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, filters: { search } }: FetchProductsParams) => {
    const products: { total: number; data: Product[] } = (
      await axios.get(api.products, {
        params: {
          $skip: page * DEFAULT_FETCH_LIMIT - DEFAULT_FETCH_LIMIT,
          name: {
            $iLike: `%${search}%`,
          },
        },
      })
    ).data;

    return {
      total: products.total,
      products: products.data.map((product) =>
        product.upload
          ? { ...product, path: API_URL + product.upload.path }
          : product
      ),
    };
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (
    { product, accessToken }: CreateProductParams,
    { rejectWithValue }
  ) => {
    const uploadId = product.uploadId === -1 ? undefined : product.uploadId;

    return await fetchWithErrorHandling(async () => {
      await axios.post(
        api.products,
        { ...product, uploadId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }, rejectWithValue);
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (
    { productId, accessToken }: DeleteProductParams,
    { rejectWithValue }
  ) => {
    return await fetchWithErrorHandling(async () => {
      await axios.delete(api.products + `/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }, rejectWithValue);
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.productCreationData.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.productCreationData.description = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.productCreationData.price = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.productCreationData.height = action.payload;
    },
    setBirthdate: (state, action: PayloadAction<string>) => {
      state.productCreationData.birthdate = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<Id>) => {
      state.productCreationData.categoryId = action.payload;
    },
    setUploadId: (state, action: PayloadAction<Id>) => {
      state.productCreationData.uploadId = action.payload;
    },
    clearProductCreation: (state) => {
      state.productCreationData = initialState.productCreationData;
      state.productCreationLoading = 'idle';
      state.productCreationSuccess = false;
      state.productCreationError = undefined;
    },
    clearProductCreationError: (state) => {
      state.productCreationError = undefined;
    },
    clearProductDeletion: (state) => {
      state.productDeletionLoading = 'idle';
      state.productDeletionSuccess = false;
      state.productCreationError = undefined;
    },
  },
  extraReducers: {
    [fetchProducts.pending as any]: (state) => {
      state.loading = 'pending';
      state.error = undefined;
    },
    [fetchProducts.fulfilled as any]: (
      state,
      {
        payload: { products, total },
      }: PayloadAction<{ total: number; products: Product[] }>
    ) => {
      state.loading = 'idle';
      state.data = products;
      state.total = total;
    },
    [fetchProducts.rejected as any]: (state, action: PayloadAction<string>) => {
      state.loading = 'idle';
      state.error = action.payload;
    },
    [createProduct.pending as any]: (state) => {
      state.productCreationLoading = 'pending';
      state.productCreationError = undefined;
      state.productCreationSuccess = false;
    },
    [createProduct.fulfilled as any]: (state) => {
      state.productCreationLoading = 'idle';
      state.productCreationSuccess = true;
    },
    [createProduct.rejected as any]: (state, action: PayloadAction<string>) => {
      state.productCreationLoading = 'idle';
      state.productCreationError = action.payload;
    },
    [deleteProduct.pending as any]: (state) => {
      state.productDeletionLoading = 'pending';
      state.productDeletionError = undefined;
      state.productDeletionSuccess = false;
    },
    [deleteProduct.fulfilled as any]: (state) => {
      state.productDeletionLoading = 'idle';
      state.productDeletionSuccess = true;
    },
    [deleteProduct.rejected as any]: (state, action: PayloadAction<string>) => {
      state.productDeletionLoading = 'idle';
      state.productDeletionError = action.payload;
    },
  },
});

export const {
  setSearch,
  setName,
  setDescription,
  setPrice,
  setCategoryId,
  setUploadId,
  clearProductCreation,
  setHeight,
  setBirthdate,
  clearProductCreationError,
  clearProductDeletion,
} = productsSlice.actions;

export const selectIsLoading = (state: RootState) =>
  state.products.loading === 'pending';
export const selectProducts = (state: RootState) => state.products.data;
export const selectTotal = (state: RootState) => state.products.total;
export const selectSearch = (state: RootState) => state.products.filters.search;
export const selectFilters = (state: RootState) => state.products.filters;
export const selectName = (state: RootState) =>
  state.products.productCreationData.name;
export const selectDescription = (state: RootState) =>
  state.products.productCreationData.description;
export const selectCategoryId = (state: RootState) =>
  state.products.productCreationData.categoryId;
export const selectUploadId = (state: RootState) =>
  state.products.productCreationData.uploadId;
export const selectPrice = (state: RootState) =>
  state.products.productCreationData.price;
export const selectHeight = (state: RootState) =>
  state.products.productCreationData.height;
export const selectBirthdate = (state: RootState) =>
  state.products.productCreationData.birthdate;
export const selectCreationSuccess = (state: RootState) =>
  state.products.productCreationSuccess;
export const selectCreationError = (state: RootState) =>
  state.products.productCreationError;
export const selectDeletionSuccess = (state: RootState) =>
  state.products.productDeletionSuccess;
export const selectDeletionError = (state: RootState) =>
  state.products.productDeletionError;

export default productsSlice.reducer;
