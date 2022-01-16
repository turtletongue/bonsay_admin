import { ReactNode } from 'react';
import { Tr, Td, Flex, useMediaQuery, Grid } from '@chakra-ui/react';

interface TableRowProps {
  data: {
    id: string | number;
    node: ReactNode | string;
  }[];
}

export const TableRow = ({ data }: TableRowProps) => {
  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  return (
    <Tr>
      {isLessThan920 ? (
        <Td>
          <Grid
            templateColumns="repeat(1, 1fr)"
            gap={3}
            justifyContent="center"
            alignItems="center"
          >
            {data.map((element) => (
              <Flex
                key={element.id}
                justifyContent="center"
                alignItems="center"
              >
                {element.node}
              </Flex>
            ))}
          </Grid>
        </Td>
      ) : (
        data.map((element) => (
          <Td key={element.id}>
            <Flex justifyContent="center" alignItems="center">
              {element.node}
            </Flex>
          </Td>
        ))
      )}
    </Tr>
  );
};

export default TableRow;
