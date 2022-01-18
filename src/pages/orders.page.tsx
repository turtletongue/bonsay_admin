import { useSearchParams, useLocation } from 'react-router-dom';
import { Box, Table, Tbody } from '@chakra-ui/react';

import TableHead from '../components/table-head.component';
import TableRow from '../components/table-row.component';
import Pagination from '../components/pagination.component';
import InfoButton from '../components/info-button.component';
import CompleteConfirmationModal from '../components/complete-confirmation-modal.component';

import { Order } from '../declarations';

export const Orders = () => {
  const [params] = useSearchParams();
  const { pathname } = useLocation();

  const orders: Order[] = [
    {
      id: 1,
      phone: '89050334601',
      client: {
        id: 1,
        user: {
          id: 1,
          email: 'client@gmail.com',
        },
      },
      address: {
        id: 1,
        city: 'Москва',
        street: 'Белая',
        house: '7A',
        postcode: '404053',
      },
      purchases: [
        {
          id: 1,
          qty: 2,
          product: {
            id: 1,
            name: 'MONDAY PINE',
            price: 750,
            description: '',
            createdAt: '2020-12-20',
            updatedAt: '2020-12-20',
            age: 30,
            height: 34,
            upload: {
              path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
            },
          },
        },
      ],
      payments: [
        {
          id: 1,
          sum: 750,
        },
      ],
      createdAt: new Date(),
    },
    {
      id: 2,
      phone: '89050334601',
      client: {
        id: 1,
        user: {
          id: 1,
          email: 'client@gmail.com',
        },
      },
      address: {
        id: 1,
        city: 'Москва',
        street: 'Белая',
        house: '7A',
        postcode: '404053',
      },
      purchases: [
        {
          id: 1,
          qty: 2,
          product: {
            id: 1,
            name: 'MONDAY PINE',
            price: 750,
            description: '',
            createdAt: '2020-12-20',
            updatedAt: '2020-12-20',
            age: 30,
            height: 34,
            upload: {
              path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
            },
          },
        },
      ],
      payments: [
        {
          id: 1,
          sum: 750,
        },
      ],
      createdAt: new Date(),
    },
    {
      id: 3,
      phone: '89050334601',
      client: {
        id: 1,
        user: {
          id: 1,
          email: 'client@gmail.com',
        },
      },
      address: {
        id: 1,
        city: 'Москва',
        street: 'Белая',
        house: '7A',
        postcode: '404053',
      },
      purchases: [
        {
          id: 1,
          qty: 2,
          product: {
            id: 1,
            name: 'MONDAY PINE',
            price: 750,
            description: '',
            createdAt: '2020-12-20',
            updatedAt: '2020-12-20',
            age: 30,
            height: 34,
            upload: {
              path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
            },
          },
        },
      ],
      payments: [
        {
          id: 1,
          sum: 750,
        },
      ],
      createdAt: new Date(),
    },
    {
      id: 4,
      phone: '89050334601',
      client: {
        id: 1,
        user: {
          id: 1,
          email: 'client@gmail.com',
        },
      },
      address: {
        id: 1,
        city: 'Москва',
        street: 'Белая',
        house: '7A',
        postcode: '404053',
      },
      purchases: [
        {
          id: 1,
          qty: 2,
          product: {
            id: 1,
            name: 'MONDAY PINE',
            price: 750,
            description: '',
            createdAt: '2020-12-20',
            updatedAt: '2020-12-20',
            age: 30,
            height: 34,
            upload: {
              path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
            },
          },
        },
      ],
      payments: [
        {
          id: 1,
          sum: 750,
        },
      ],
      createdAt: new Date(),
    },
  ];

  const getData = (order: Order) => {
    return [
      { id: 1, node: order.phone, title: 'Телефон для связи' },
      {
        id: 2,
        node: `${order.purchases.reduce(
          (sum, { qty, product: { price } }) => sum + qty * price,
          0
        )} ₽`,
        title: 'Сумма заказа',
      },
      {
        id: 3,
        node: order.createdAt?.toLocaleString(),
        title: 'Время оформления',
      },
      {
        id: 4,
        node: (
          <>
            <InfoButton />
            <CompleteConfirmationModal />
          </>
        ),
        title: 'Действия',
      },
    ];
  };

  return (
    <Box>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead
          titles={[
            'Телефон для связи',
            'Сумма заказа',
            'Время оформления',
            'Действия',
          ]}
        />
        <Tbody>
          {orders.map((order) => {
            return <TableRow key={order.id} data={getData(order)} />;
          })}
        </Tbody>
      </Table>
      <Pagination
        pageNumber={Number(params.get('page')) || 1}
        url={pathname}
        total={orders.length}
      />
    </Box>
  );
};

export default Orders;
