import { AdminsState } from './admins.declarations';

export const initialState: AdminsState = {
  total: 0,
  data: [],
  loading: 'idle',
  error: undefined,

  writeData: {
    email: '',
    password: '',
    passwordConfirmation: '',
  },

  createLoading: 'idle',
  createError: undefined,
  createSuccess: false,

  deleteLoading: 'idle',
  deleteError: undefined,
  deleteSuccess: false,
};

export default initialState;
