export type CategoriesRadarData = {
  name: string;
  count: number;
};

export interface CategoriesRadarState {
  data: CategoriesRadarData[];
  loading: 'idle' | 'pending';
  error?: string;

  startDate?: Date;
  endDate?: Date;
}

export type FetchCategoriesRadarParams = {
  startDate?: Date;
  endDate?: Date;
  accessToken: string | undefined;
};
