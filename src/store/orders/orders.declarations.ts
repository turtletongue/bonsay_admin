import { Id, Order, OrderStatus } from '@app/declarations';

export interface OrdersState {
  total: number;
  data: Order[];
  loading: 'idle' | 'pending';
  error?: string;

  editLoading: 'idle' | 'pending';
  editError?: string;
  editSuccess: boolean;

  page: number;
}

export type FetchOrdersParams = {
  page: number;
  accessToken: string | undefined;
};

export type PatchOrderParams = {
  data: {
    id: Id;
    status: OrderStatus;
  };
  accessToken: string | undefined;
};
