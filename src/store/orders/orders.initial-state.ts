import { OrdersState } from './orders.declarations';

export const initialState: OrdersState = {
  total: 0,
  data: [],
  loading: 'idle',
  error: undefined,

  editLoading: 'idle',
  editError: undefined,
  editSuccess: false,

  page: 1,
};

export default initialState;
