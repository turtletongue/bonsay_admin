import { useSearchParams, useLocation } from 'react-router-dom';
import { Box, Table, Tbody } from '@chakra-ui/react';

import TableHead from '../components/table-head.component';
import TableRow from '../components/table-row.component';
import Pagination from '../components/pagination.component';
import InfoButton from '../components/info-button.component';

import { Client } from '../declarations';

export const Clients = () => {
  const [params] = useSearchParams();
  const { pathname } = useLocation();

  const clients = [
    {
      id: 1,
      user: {
        id: 1,
        email: 'client@gmail.com',
      },
      createdAt: new Date(),
    },
    {
      id: 2,
      user: {
        id: 2,
        email: 'client@gmail.com',
      },
      createdAt: new Date(),
    },
    {
      id: 3,
      user: {
        id: 3,
        email: 'client@gmail.com',
      },
      createdAt: new Date(),
    },
    {
      id: 4,
      user: {
        id: 4,
        email: 'client@gmail.com',
      },
      createdAt: new Date(),
    },
  ];

  const getData = (client: Client) => {
    return [
      { id: 1, node: client.id, title: 'ID' },
      { id: 2, node: client.user.email, title: 'Email' },
      {
        id: 3,
        node: client.createdAt?.toLocaleString(),
        title: 'Дата регистрации',
      },
      {
        id: 4,
        node: <InfoButton />,
        title: 'Действия',
      },
    ];
  };

  return (
    <Box>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead titles={['ID', 'Email', 'Дата регистрации', 'Действия']} />
        <Tbody>
          {clients.map((client) => {
            return <TableRow key={client.id} data={getData(client)} />;
          })}
        </Tbody>
      </Table>
      <Pagination
        pageNumber={Number(params.get('page')) || 1}
        url={pathname}
        total={clients.length}
      />
    </Box>
  );
};

export default Clients;
