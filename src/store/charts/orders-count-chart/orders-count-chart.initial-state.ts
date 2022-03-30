import { OrdersCountChartState } from './orders-count-chart.declarations';

export const initialState: OrdersCountChartState = {
  data: [],
  loading: 'idle',
  error: undefined,

  startDate: undefined,
  endDate: undefined,
};

export default initialState;
