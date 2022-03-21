import { ProductsState } from './products.declarations';

export const initialState: ProductsState = {
  total: 0,
  data: [],
  loading: 'idle',
  error: undefined,
  filters: {
    search: '',
  },

  writeData: {
    name: '',
    description: '',
    price: 0,
    height: 0,
    birthdate: new Date().toISOString(),
    categoryId: -1,
    uploadId: -1,
    photosUploadsIds: [],
  },

  createLoading: 'idle',
  createError: undefined,
  createSuccess: false,

  deleteLoading: 'idle',
  deleteError: undefined,
  deleteSuccess: false,

  editLoading: 'idle',
  editError: undefined,
  editSuccess: false,

  page: 1,
};

export default initialState;
