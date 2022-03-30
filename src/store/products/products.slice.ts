import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchWithErrorHandling } from '@app/utils';
import { api } from '@app/api';
import { DEFAULT_FETCH_LIMIT } from '@app/variables';
import initialState from './products.initial-state';

import { Id, Photo, Product } from '@app/declarations';
import { RootState } from '@store/index';
import {
  CreateProductParams,
  DeleteProductParams,
  FetchProductsParams,
  PatchProductParams,
  SuccessCreation,
} from './products.declarations';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({
    page,
    filters: { search, categoryId, state },
  }: FetchProductsParams) => {
    const categoryIdRestriction = categoryId !== '-1' ? { categoryId } : {};

    const stateRestriction =
      state === 'all' ? {} : { isAvailable: state === 'on-sale' };

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
          ...categoryIdRestriction,
          ...stateRestriction,
          isDeleted: false,
        },
      })
    ).data;

    const productsWithPhotos = await Promise.all(
      products.data.map(async (product) => {
        const photos = await axios.get(api.photos, {
          params: {
            productId: product.id,
          },
        });

        return {
          ...product,
          path: product.upload?.path,
          photosUploadsIds: (photos.data?.data || []).map(
            (photo: Photo) => photo.uploadId
          ),
        };
      })
    );

    return {
      total: products.total,
      products: productsWithPhotos,
    };
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async ({ data, accessToken }: CreateProductParams, { rejectWithValue }) => {
    const uploadId = data.uploadId === -1 ? undefined : data.uploadId;

    const photosUploadsIds = data.photosUploadsIds || [];

    const result = await fetchWithErrorHandling(async () => {
      return await axios.post(
        api.products,
        { ...data, uploadId, photosUploadsIds: undefined },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }, rejectWithValue);

    if ((result as SuccessCreation)?.data?.id) {
      await Promise.all(
        photosUploadsIds.map(async (id) => {
          return await axios.post(
            api.photos,
            { uploadId: id, productId: (result as SuccessCreation).data.id },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        })
      );
    }

    return result;
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
  async ({ data, accessToken }: PatchProductParams, { rejectWithValue }) => {
    const existingPhotos =
      (
        await axios.get(api.photos, {
          params: {
            productId: data.id,
          },
        })
      ).data?.data || [];

    const existingPhotosUploadsIds = existingPhotos.map(
      (photo: Photo) => photo.uploadId
    );

    const newPhotosUploadsIds = (data.photosUploadsIds || []).filter(
      (photoUploadId) => !existingPhotosUploadsIds.includes(photoUploadId)
    );

    await Promise.all(
      newPhotosUploadsIds.map(async (photoUploadId) => {
        await axios.post(
          api.photos,
          { uploadId: photoUploadId, productId: data.id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      })
    );

    const removedPhotosUploadsIds = existingPhotosUploadsIds.filter(
      (existingPhotoUploadId: Id) =>
        !(data.photosUploadsIds || []).includes(existingPhotoUploadId)
    ) as Id[];

    await Promise.all(
      removedPhotosUploadsIds.map(async (photoUploadId) => {
        const photo = existingPhotos.find(
          (photo: Photo) => photo.uploadId === photoUploadId
        );

        await axios.delete(api.photos + `/${photo.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
    );

    return await fetchWithErrorHandling(async () => {
      await axios.patch(
        api.products + `/${data.id}`,
        { ...data, upload: undefined, photos: undefined },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.categoryId = action.payload;
    },
    setStateFilter: (
      state,
      action: PayloadAction<'all' | 'on-sale' | 'sold'>
    ) => {
      state.filters.state = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.writeData.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.writeData.description = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.writeData.price = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.writeData.height = action.payload;
    },
    setBirthdate: (state, action: PayloadAction<string>) => {
      state.writeData.birthdate = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<Id>) => {
      state.writeData.categoryId = action.payload;
    },
    setUploadId: (state, action: PayloadAction<Id>) => {
      state.writeData.uploadId = action.payload;
    },
    setPhotosUploadsIds: (state, action: PayloadAction<Id[]>) => {
      state.writeData.photosUploadsIds = action.payload;
    },
    clearProductCreate: (state) => {
      state.writeData = initialState.writeData;
      state.createLoading = 'idle';
      state.createSuccess = false;
      state.createError = undefined;
    },
    clearProductCreateError: (state) => {
      state.createError = undefined;
    },
    clearDelete: (state) => {
      state.deleteLoading = 'idle';
      state.deleteSuccess = false;
      state.deleteError = undefined;
    },
    clearProductEdit: (state) => {
      state.writeData = initialState.writeData;
      state.editLoading = 'idle';
      state.editSuccess = false;
      state.editError = undefined;
    },
    clearProductEditError: (state) => {
      state.editError = undefined;
    },
    setWriteData: (
      state,
      action: PayloadAction<Partial<Product> & { photosUploadsIds: Id[] }>
    ) => {
      const product = action.payload;

      state.writeData = { ...product, price: +(product.price || 0) };
    },
    clearWriteData: (state) => {
      state.writeData = initialState.writeData;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
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
      state.createLoading = 'pending';
      state.createError = undefined;
      state.createSuccess = false;
    },
    [createProduct.fulfilled as any]: (state) => {
      state.createLoading = 'idle';
      state.createSuccess = true;
    },
    [createProduct.rejected as any]: (state, action: PayloadAction<string>) => {
      state.createLoading = 'idle';
      state.createError = action.payload;
    },
    [deleteProduct.pending as any]: (state) => {
      state.deleteLoading = 'pending';
      state.deleteError = undefined;
      state.deleteSuccess = false;
    },
    [deleteProduct.fulfilled as any]: (state) => {
      state.deleteLoading = 'idle';
      state.deleteSuccess = true;
    },
    [deleteProduct.rejected as any]: (state, action: PayloadAction<string>) => {
      state.deleteLoading = 'idle';
      state.deleteError = action.payload;
    },
    [patchProduct.pending as any]: (state) => {
      state.editLoading = 'pending';
      state.editError = undefined;
      state.editSuccess = false;
    },
    [patchProduct.fulfilled as any]: (state) => {
      state.editLoading = 'idle';
      state.editSuccess = true;
    },
    [patchProduct.rejected as any]: (state, action: PayloadAction<string>) => {
      state.editLoading = 'idle';
      state.editError = action.payload;
    },
  },
});

export const {
  setSearch,
  setCategoryFilter,
  setStateFilter,
  setName,
  setDescription,
  setPrice,
  setCategoryId,
  setUploadId,
  setPhotosUploadsIds,
  clearProductCreate,
  setHeight,
  setBirthdate,
  clearProductCreateError,
  clearDelete,
  clearProductEdit,
  clearProductEditError,
  setWriteData,
  clearWriteData,
  setPage,
} = productsSlice.actions;

export const selectIsLoading = (state: RootState) =>
  state.products.loading === 'pending';
export const selectProducts = (state: RootState) => state.products.data;
export const selectTotal = (state: RootState) => state.products.total;
export const selectSearch = (state: RootState) => state.products.filters.search;
export const selectCategoryIdFilter = (state: RootState) =>
  state.products.filters.categoryId;
export const selectStateFilter = (state: RootState) =>
  state.products.filters.state;
export const selectFilters = (state: RootState) => state.products.filters;
export const selectName = (state: RootState) => state.products.writeData.name;
export const selectDescription = (state: RootState) =>
  state.products.writeData.description;
export const selectCategoryId = (state: RootState) =>
  state.products.writeData.categoryId;
export const selectUploadId = (state: RootState) =>
  state.products.writeData.uploadId;
export const selectPhotosUploadsIds = (state: RootState) =>
  state.products.writeData.photosUploadsIds;
export const selectPrice = (state: RootState) => state.products.writeData.price;
export const selectHeight = (state: RootState) =>
  state.products.writeData.height;
export const selectBirthdate = (state: RootState) =>
  state.products.writeData.birthdate;
export const selectCreateSuccess = (state: RootState) =>
  state.products.createSuccess;
export const selectCreateError = (state: RootState) =>
  state.products.createError;
export const selectDeleteSuccess = (state: RootState) =>
  state.products.deleteSuccess;
export const selectDeleteError = (state: RootState) =>
  state.products.deleteError;
export const selectEditSuccess = (state: RootState) =>
  state.products.editSuccess;
export const selectEditError = (state: RootState) => state.products.editError;
export const selectPage = (state: RootState) => state.products.page;

export default productsSlice.reducer;
