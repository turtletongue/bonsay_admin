import { OrdersStatusesChartState } from './orders-statuses-chart.declarations';

export const initialState: OrdersStatusesChartState = {
  data: [],
  loading: 'idle',
  error: undefined,

  startDate: undefined,
  endDate: undefined,
};

export default initialState;
