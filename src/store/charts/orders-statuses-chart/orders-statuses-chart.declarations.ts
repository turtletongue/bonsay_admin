export type OrderStatusData = {
  name: string;
  count: number;
};

export interface OrdersStatusesChartState {
  data: OrderStatusData[];
  loading: 'idle' | 'pending';
  error?: string;

  startDate?: Date;
  endDate?: Date;
}

export type FetchOrdersStatusesParams = {
  startDate?: Date;
  endDate?: Date;
  accessToken: string | undefined;
};
