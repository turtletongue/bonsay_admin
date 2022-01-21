import { CategoriesState } from './categories.declarations';

export const initialState: CategoriesState = {
  data: [],
  loading: 'idle',
  error: undefined,

  writeData: {
    name: '',
    description: '',
    uploadId: -1,
  },

  createSuccess: false,
  createLoading: 'idle',
  createError: undefined,

  deleteSuccess: false,
  deleteLoading: 'idle',
  deleteError: undefined,

  editSuccess: false,
  editLoading: 'idle',
  editError: undefined,
};

export default initialState;
