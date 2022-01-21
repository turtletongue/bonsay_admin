import { Id, User } from '../../declarations';

export interface AdminsState {
  total: number;
  data: User[];
  loading: 'idle' | 'pending';
  error?: string;

  writeData: Partial<User>;

  createLoading: 'idle' | 'pending';
  createError?: string;
  createSuccess: boolean;

  deleteLoading: 'idle' | 'pending';
  deleteError?: string;
  deleteSuccess: boolean;
}

export type FetchAdminsParams = {
  page: number;
  accessToken: string;
};

export type CreateAdminParams = {
  data: {
    email?: string;
    password?: string;
  };
  accessToken?: string;
};

export type DeleteAdminParams = {
  adminId: Id;
  accessToken: string;
};
