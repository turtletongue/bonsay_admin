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
  PatchProductParams,
} from './products.declarations';
import { RootState } from '..';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, filters: { search } }: FetchProductsParams) => {
    const products: { total: number; data: Product[] } = (
      await axios.get(api.products, {
        params: {
          $skip: page * DEFAULT_FETCH_LIMIT - DEFAULT_FETCH_LIMIT,
          $order: {
            updatedAt: 'DESC',
          },
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

export const patchProduct = createAsyncThunk(
  'products/patchProduct',
  async ({ product, accessToken }: PatchProductParams, { rejectWithValue }) => {
    return await fetchWithErrorHandling(async () => {
      await axios.patch(api.products + `/${product.id}`, product, {
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
      state.productData.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.productData.description = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.productData.price = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.productData.height = action.payload;
    },
    setBirthdate: (state, action: PayloadAction<string>) => {
      state.productData.birthdate = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<Id>) => {
      state.productData.categoryId = action.payload;
    },
    setUploadId: (state, action: PayloadAction<Id>) => {
      state.productData.uploadId = action.payload;
    },
    clearProductCreate: (state) => {
      state.productData = initialState.productData;
      state.productCreateLoading = 'idle';
      state.productCreateSuccess = false;
      state.productCreateError = undefined;
    },
    clearProductCreateError: (state) => {
      state.productCreateError = undefined;
    },
    clearProductDelete: (state) => {
      state.productDeleteLoading = 'idle';
      state.productDeleteSuccess = false;
      state.productDeleteError = undefined;
    },
    clearProductEdit: (state) => {
      state.productData = initialState.productData;
      state.productEditLoading = 'idle';
      state.productEditSuccess = false;
      state.productEditError = undefined;
    },
    clearProductEditError: (state) => {
      state.productEditError = undefined;
    },
    setProductData: (state, action: PayloadAction<Partial<Product>>) => {
      const product = action.payload;

      state.productData = { ...product, price: +(product.price || 0) };
    },
    clearProductData: (state) => {
      state.productData = initialState.productData;
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
      state.productCreateLoading = 'pending';
      state.productCreateError = undefined;
      state.productCreateSuccess = false;
    },
    [createProduct.fulfilled as any]: (state) => {
      state.productCreateLoading = 'idle';
      state.productCreateSuccess = true;
    },
    [createProduct.rejected as any]: (state, action: PayloadAction<string>) => {
      state.productCreateLoading = 'idle';
      state.productCreateError = action.payload;
    },
    [deleteProduct.pending as any]: (state) => {
      state.productDeleteLoading = 'pending';
      state.productDeleteError = undefined;
      state.productDeleteSuccess = false;
    },
    [deleteProduct.fulfilled as any]: (state) => {
      state.productDeleteLoading = 'idle';
      state.productDeleteSuccess = true;
    },
    [deleteProduct.rejected as any]: (state, action: PayloadAction<string>) => {
      state.productDeleteLoading = 'idle';
      state.productDeleteError = action.payload;
    },
    [patchProduct.pending as any]: (state) => {
      state.productEditLoading = 'pending';
      state.productEditError = undefined;
      state.productEditSuccess = false;
    },
    [patchProduct.fulfilled as any]: (state) => {
      state.productEditLoading = 'idle';
      state.productEditSuccess = true;
    },
    [patchProduct.rejected as any]: (state, action: PayloadAction<string>) => {
      state.productEditLoading = 'idle';
      state.productEditError = action.payload;
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
  clearProductCreate,
  setHeight,
  setBirthdate,
  clearProductCreateError,
  clearProductDelete,
  clearProductEdit,
  clearProductEditError,
  setProductData,
  clearProductData,
} = productsSlice.actions;

export const selectIsLoading = (state: RootState) =>
  state.products.loading === 'pending';
export const selectProducts = (state: RootState) => state.products.data;
export const selectTotal = (state: RootState) => state.products.total;
export const selectSearch = (state: RootState) => state.products.filters.search;
export const selectFilters = (state: RootState) => state.products.filters;
export const selectName = (state: RootState) => state.products.productData.name;
export const selectDescription = (state: RootState) =>
  state.products.productData.description;
export const selectCategoryId = (state: RootState) =>
  state.products.productData.categoryId;
export const selectUploadId = (state: RootState) =>
  state.products.productData.uploadId;
export const selectPrice = (state: RootState) =>
  state.products.productData.price;
export const selectHeight = (state: RootState) =>
  state.products.productData.height;
export const selectBirthdate = (state: RootState) =>
  state.products.productData.birthdate;
export const selectCreateSuccess = (state: RootState) =>
  state.products.productCreateSuccess;
export const selectCreateError = (state: RootState) =>
  state.products.productCreateError;
export const selectDeleteSuccess = (state: RootState) =>
  state.products.productDeleteSuccess;
export const selectDeleteError = (state: RootState) =>
  state.products.productDeleteError;
export const selectEditSuccess = (state: RootState) =>
  state.products.productEditSuccess;
export const selectEditError = (state: RootState) =>
  state.products.productEditError;

export default productsSlice.reducer;
