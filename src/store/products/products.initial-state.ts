import { ProductsState } from './products.declarations';

export const initialState: ProductsState = {
  total: 0,
  data: [],
  loading: 'idle',
  error: undefined,
  filters: {
    search: '',
  },

  productData: {
    name: '',
    description: '',
    price: 0,
    height: 0,
    birthdate: new Date().toISOString(),
    categoryId: -1,
    uploadId: -1,
  },

  productCreateLoading: 'idle',
  productCreateError: undefined,
  productCreateSuccess: false,

  productDeleteLoading: 'idle',
  productDeleteError: undefined,
  productDeleteSuccess: false,

  productEditLoading: 'idle',
  productEditError: undefined,
  productEditSuccess: false,
};

export default initialState;
