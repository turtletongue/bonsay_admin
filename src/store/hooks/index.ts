import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import {
  clearAdminCreate,
  clearAdminCreateError,
  createAdmin,
} from '@store/admins/admins.slice';
import {
  clearCategoryEdit,
  clearCategoryEditError,
  patchCategory,
} from '@store/categories/categories.slice';
import {
  clearProductEdit,
  clearProductEditError,
  patchProduct,
} from '@store/products/products.slice';
import {
  createCategory,
  clearCategoryCreate,
  clearCategoryCreateError,
} from '@store/categories/categories.slice';
import {
  createProduct,
  clearProductCreate,
  clearProductCreateError,
} from '@store/products/products.slice';

import type { RootState, AppDispatch } from '@store/index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const storeTable = {
  createActions: {
    products: 'createProduct',
    categories: 'createCategory',
    admins: 'createAdmin',
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
    admins: {
      successCreate: 'Администратор создан.',
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
    admins: {
      createAdmin,
      clearCreate: clearAdminCreate,
      clearCreateError: clearAdminCreateError,
    },
  },
} as const;

export * from './useCreate';
