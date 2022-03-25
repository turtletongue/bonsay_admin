import { useEffect } from 'react';
import { Table, Tbody } from '@chakra-ui/react';

import TableHead from '@components/table-head.component';
import TableRow from '@components/table-row.component';
import Pagination from '@components/pagination.component';
import LoadingHandler from '@components/loading-handler.component';
import BadgeMenu from '@components/badge-menu.component';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  clearProductEdit,
  fetchOrders,
  patchOrder,
  selectEditSuccess,
  selectIsLoading,
  selectOrders,
  selectPage,
  selectTotal,
  setPage,
} from '@store/orders/orders.slice';
import { selectAccessToken } from '@store/core/core.slice';
import { orderBadgeColor, orderStatus } from '@app/variables';

import { Id, Order, OrderStatus } from '@app/declarations';
import { getOrderNumber } from '@app/utils';
import ContentButton from '@components/content-button.component';

export const Orders = () => {
  const pageNumber = useAppSelector(selectPage);

  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);
  const total = useAppSelector(selectTotal);
  const orderEditSuccess = useAppSelector(selectEditSuccess);

  const accessToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    dispatch(fetchOrders({ page: pageNumber, accessToken }));
  }, [dispatch, pageNumber, accessToken]);

  useEffect(() => {
    if (orderEditSuccess) {
      dispatch(fetchOrders({ page: pageNumber, accessToken }));

      dispatch(setPage(1));

      dispatch(clearProductEdit());
    }
  }, [dispatch, pageNumber, orderEditSuccess, accessToken]);

  useEffect(() => {
    setPage(1);
  }, [dispatch]);

  const changeOrderStatus = (orderId: Id, status: OrderStatus) => {
    dispatch(patchOrder({ data: { id: orderId, status }, accessToken }));
  };

  const getData = (order: Order) => {
    return [
      {
        id: 1,
        node: `#${getOrderNumber(order.id)}`,
        title: 'Номер',
      },
      {
        id: 2,
        node: `${order.purchases
          .reduce((sum, purchase) => sum + +purchase.product.price, 0)
          .toLocaleString('ru')} ₽`,
        title: 'Сумма',
      },
      {
        id: 3,
        node: (
          <BadgeMenu
            defaultBadge={{
              id: 0,
              content: {
                color: orderBadgeColor[order.status],
                text: orderStatus[order.status],
              },
            }}
            badges={[
              {
                id: 1,
                content: {
                  color: 'blue',
                  text: 'Обработка',
                },
                onClick: () => changeOrderStatus(order.id, 'processing'),
              },
              {
                id: 2,
                content: {
                  color: 'yellow',
                  text: 'Доставка',
                },
                onClick: () => changeOrderStatus(order.id, 'delivery'),
              },
              {
                id: 3,
                content: {
                  color: 'green',
                  text: 'Завершён',
                },
                onClick: () => changeOrderStatus(order.id, 'completed'),
              },
              {
                id: 4,
                content: {
                  color: 'red',
                  text: 'Отменён',
                },
                onClick: () => changeOrderStatus(order.id, 'cancelled'),
              },
            ].filter(
              (badge) => badge.content.color !== orderBadgeColor[order.status]
            )}
          />
        ),
        title: 'Статус',
      },
      {
        id: 4,
        node: new Date(order.createdAt || Date.now()).toLocaleString('ru'),
        title: 'Дата',
      },
      {
        id: 5,
        node: <ContentButton />,
        title: 'Подробнее',
      },
    ];
  };

  const onPageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const isLoading = useAppSelector(selectIsLoading);

  return (
    <LoadingHandler isLoading={isLoading}>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead titles={['Номер', 'Сумма', 'Статус', 'Дата', 'Подробнее']} />
        <Tbody>
          {orders.map((order) => {
            return <TableRow key={order.id} data={getData(order)} />;
          })}
        </Tbody>
      </Table>
      <Pagination
        pageNumber={pageNumber}
        total={total}
        setPage={onPageChange}
      />
    </LoadingHandler>
  );
};

export default Orders;
