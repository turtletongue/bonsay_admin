export type RevenueData = {
  date: string;
  sum: number;
};

export interface RevenueChartState {
  data: RevenueData[];
  loading: 'idle' | 'pending';
  error?: string;

  startDate?: Date;
  endDate?: Date;
}

export type FetchRevenueDataParams = {
  startDate?: Date;
  endDate?: Date;
  accessToken: string | undefined;
};
