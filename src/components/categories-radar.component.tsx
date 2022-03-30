import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { Box, Text } from '@chakra-ui/react';

import { selectData } from '@store/charts/categories-radar/categories-radar.slice';
import { useAppSelector } from '@store/hooks';

export const CategoriesRadar = () => {
  const data = useAppSelector(selectData);

  return (
    <Box width="full" height="20rem">
      <Text textAlign="center" fontWeight="500">
        Проданные деревья по категориям
      </Text>
      <ResponsiveContainer>
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} />
          <Radar
            dataKey="count"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CategoriesRadar;
