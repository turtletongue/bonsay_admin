import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, Text, useMediaQuery } from '@chakra-ui/react';

import { selectData } from '@store/charts/revenue-chart/revenue-chart.slice';
import { useAppSelector } from '@store/hooks';

export const RevenueChart = () => {
  const data = useAppSelector(selectData);

  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  return (
    <Box width="full" height={isLessThan920 ? '13rem' : '20rem'}>
      <Text textAlign="center" fontWeight="500">
        Выручка
      </Text>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis
            tick={isLessThan920 ? false : true}
            width={isLessThan920 ? 0 : undefined}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="sum"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorGreen)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueChart;
