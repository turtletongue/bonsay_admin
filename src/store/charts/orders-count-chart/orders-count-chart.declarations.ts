export type OrdersCountData = {
  date: string;
  sum: number;
};

export interface OrdersCountChartState {
  data: OrdersCountData[];
  loading: 'idle' | 'pending';
  error?: string;

  startDate?: Date;
  endDate?: Date;
}

export type FetchOrdersCountDataParams = {
  startDate?: Date;
  endDate?: Date;
  accessToken: string | undefined;
};
