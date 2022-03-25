import { OrderState } from './order.declarations';

export const initialState: OrderState = {
  loading: 'idle',
  data: undefined,
  error: undefined,
};

export default initialState;
