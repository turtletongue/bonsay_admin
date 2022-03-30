import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, Text, useMediaQuery } from '@chakra-ui/react';

import { selectData } from '@store/charts/orders-count-chart/orders-count-chart.slice';
import { useAppSelector } from '@store/hooks';

export const OrdersCountChart = () => {
  const data = useAppSelector(selectData);

  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  return (
    <Box width="full" height={isLessThan920 ? '13rem' : '20rem'}>
      <Text textAlign="center" fontWeight="500">
        Количество заказов
      </Text>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tick={isLessThan920 ? false : true}
            width={isLessThan920 ? 0 : undefined}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OrdersCountChart;
