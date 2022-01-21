import {
  clearCategoryEdit,
  clearCategoryEditError,
  patchCategory,
} from './../categories/categories.slice';
import {
  clearProductEdit,
  clearProductEditError,
  patchProduct,
} from './../products/products.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import {
  createCategory,
  clearCategoryCreate,
  clearCategoryCreateError,
} from '../categories/categories.slice';
import {
  createProduct,
  clearProductCreate,
  clearProductCreateError,
} from '../products/products.slice';

import type { RootState, AppDispatch } from '..';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const storeTable = {
  createActions: {
    products: 'createProduct',
    categories: 'createCategory',
  },
  editActions: {
    products: 'patchProduct',
    categories: 'patchCategory',
  },
  labels: {
    products: {
      successCreate: 'Товар создан.',
      successEdit: 'Товар изменён.',
    },
    categories: {
      successCreate: 'Категория создана.',
      successEdit: 'Категория изменена.',
    },
  },
  slices: {
    products: {
      createProduct,
      clearCreate: clearProductCreate,
      clearCreateError: clearProductCreateError,

      patchProduct,
      clearEdit: clearProductEdit,
      clearEditError: clearProductEditError,
    },
    categories: {
      createCategory,
      clearCreate: clearCategoryCreate,
      clearCreateError: clearCategoryCreateError,

      patchCategory,
      clearEdit: clearCategoryEdit,
      clearEditError: clearCategoryEditError,
    },
  },
} as const;

export * from './useCreate';
