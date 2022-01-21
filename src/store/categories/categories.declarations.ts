import { Category, Id } from '../../declarations';

export interface CategoriesState {
  data: Category[];
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
}

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
