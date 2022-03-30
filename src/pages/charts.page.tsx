import { useEffect } from 'react';
import { Grid } from '@chakra-ui/react';

import RevenueChart from '@components/revenue-chart.component';
import CategoriesRadar from '@components/categories-radar.component';
import OrdersStatusesPie from '@components/orders-statuses-pie.component';
import OrdersCountChart from '@components/orders-count-chart.component';
import { selectAccessToken } from '@store/core/core.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchRevenueData } from '@store/charts/revenue-chart/revenue-chart.slice';
import { fetchCategoriesRadarData } from '@store/charts/categories-radar/categories-radar.slice';
import { fetchOrdersStatusesData } from '@store/charts/orders-statuses-chart/orders-statuses-chart.slice';
import { fetchOrdersCountData } from '@store/charts/orders-count-chart/orders-count-chart.slice';

export const Charts = () => {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    dispatch(fetchRevenueData({ accessToken }));

    dispatch(fetchCategoriesRadarData({ accessToken }));

    dispatch(fetchOrdersStatusesData({ accessToken }));

    dispatch(fetchOrdersCountData({ accessToken }));
  }, [dispatch, accessToken]);

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(100px, 500px))"
      justifyContent="center"
      gridGap="4rem"
      p="1rem"
    >
      <RevenueChart />
      <CategoriesRadar />
      <OrdersStatusesPie />
      <OrdersCountChart />
    </Grid>
  );
};

export default Charts;
