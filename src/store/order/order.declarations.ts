import { Id, Order } from '@app/declarations';

export interface OrderState {
  loading: 'idle' | 'pending';
  data?: Order;
  error?: string;
}

export interface FetchOrderParams {
  id: Id | undefined;
  accessToken: string | undefined;
}
