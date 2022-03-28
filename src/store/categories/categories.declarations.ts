import { Category, Id } from '@app/declarations';

export interface CategoriesState {
  data: Category[];
  total: number;
  loading: 'idle' | 'pending';
  error?: string;

  writeData: Partial<Category>;

  createSuccess: boolean;
  createLoading: 'idle' | 'pending';
  createError?: string;

  deleteLoading: 'idle' | 'pending';
  deleteError?: string;
  deleteSuccess: boolean;

  editSuccess: boolean;
  editLoading: 'idle' | 'pending';
  editError?: string;

  page: number;
}

export type FetchCategoriesParams = {
  isPaginationDisabled?: boolean;
  page?: number;
};

export type CreateCategoryParams = {
  data: {
    name?: string;
    description?: string;
    uploadId?: Id;
  };
  accessToken?: string;
};

export type DeleteCategoryParams = {
  categoryId: Id;
  accessToken: string;
};

export type PatchCategoryParams = {
  data: {
    id: Id;
    name?: string;
    description?: string;
    uploadId?: Id;
  };
  accessToken: string;
};
