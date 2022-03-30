import { CategoriesRadarState } from './categories-radar.declarations';

export const initialState: CategoriesRadarState = {
  data: [],
  loading: 'idle',
  error: undefined,

  startDate: undefined,
  endDate: undefined,
};

export default initialState;
