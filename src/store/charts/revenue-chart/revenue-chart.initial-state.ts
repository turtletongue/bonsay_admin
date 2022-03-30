import { RevenueChartState } from './revenue-chart.declarations';

export const initialState: RevenueChartState = {
  data: [],
  loading: 'idle',
  error: undefined,

  startDate: undefined,
  endDate: undefined,
};

export default initialState;
