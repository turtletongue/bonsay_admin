import { useSearchParams, useLocation } from 'react-router-dom';
import { Box, Icon, Button, Table, Tbody } from '@chakra-ui/react';
import { AiOutlineInfo } from 'react-icons/ai';

import TableHead from '../components/table-head.component';
import TableRow from '../components/table-row.component';
import Pagination from '../components/pagination.component';

import { Client } from '../declarations';

export const Clients = () => {
  const [params] = useSearchParams();
  const { pathname } = useLocation();

  const clients = [
    {
      id: 1,
      user: {
        email: 'client@gmail.com',
      },
      createdAt: new Date(),
    },
    {
      id: 2,
      user: {
        email: 'client@gmail.com',
      },
      createdAt: new Date(),
    },
    {
      id: 3,
      user: {
        email: 'client@gmail.com',
      },
      createdAt: new Date(),
    },
    {
      id: 4,
      user: {
        email: 'client@gmail.com',
      },
      createdAt: new Date(),
    },
  ];

  const getData = (client: Client) => {
    return [
      { id: 1, node: client.id },
      { id: 2, node: client.user.email },
      { id: 3, node: client.createdAt?.toLocaleString() },
      {
        id: 3,
        node: (
          <Button>
            <Icon as={AiOutlineInfo} color="blue.500" w={3} h={3} />
          </Button>
        ),
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
