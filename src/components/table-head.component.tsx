import { Thead, Th, Tr, useMediaQuery } from '@chakra-ui/react';

interface TableHeadProps {
  titles: string[];
}

export const TableHead = ({ titles }: TableHeadProps) => {
  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  return (
    <Thead>
      {!isLessThan920 && (
        <Tr>
          {titles.map((title) => (
            <Th key={title} textAlign="center">
              {title}
            </Th>
          ))}
        </Tr>
      )}
    </Thead>
  );
};

export default TableHead;
