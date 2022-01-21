import { ProductsState } from './products.declarations';

export const initialState: ProductsState = {
  total: 0,
  data: [],
  loading: 'idle',
  error: undefined,
  filters: {
    search: '',
  },

  productCreationData: {
    name: '',
    description: '',
    price: 0,
    height: 0,
    birthdate: new Date().toISOString(),
    categoryId: -1,
    uploadId: -1,
  },
  productCreationLoading: 'idle',
  productCreationError: undefined,
  productCreationSuccess: false,

  productDeletionLoading: 'idle',
  productDeletionError: undefined,
  productDeletionSuccess: false,
};

export default initialState;
