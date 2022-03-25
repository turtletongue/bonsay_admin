import { useEffect } from 'react';
import { Table, Tbody } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import TableHead from '@components/table-head.component';
import TableRow from '@components/table-row.component';
import Pagination from '@components/pagination.component';
import LoadingHandler from '@components/loading-handler.component';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  clearOrderEdit,
  fetchOrders,
  selectEditSuccess,
  selectIsLoading,
  selectOrders,
  selectPage,
  selectStatusFilter,
  selectTotal,
  setPage,
} from '@store/orders/orders.slice';
import { selectAccessToken } from '@store/core/core.slice';
import getOrdersTableData from '@app/table-data/get-orders-table-data';

export const Orders = () => {
  const navigate = useNavigate();

  const pageNumber = useAppSelector(selectPage);

  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);
  const total = useAppSelector(selectTotal);
  const orderEditSuccess = useAppSelector(selectEditSuccess);
  const statusFilter = useAppSelector(selectStatusFilter);

  const accessToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    dispatch(
      fetchOrders({ page: pageNumber, status: statusFilter, accessToken })
    );
  }, [dispatch, pageNumber, statusFilter, accessToken]);

  useEffect(() => {
    if (orderEditSuccess) {
      dispatch(
        fetchOrders({ page: pageNumber, status: statusFilter, accessToken })
      );

      dispatch(setPage(1));

      dispatch(clearOrderEdit());
    }
  }, [dispatch, pageNumber, orderEditSuccess, statusFilter, accessToken]);

  useEffect(() => {
    setPage(1);
  }, [dispatch]);

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
            return (
              <TableRow
                key={order.id}
                data={getOrdersTableData(order, () =>
                  navigate(`/orders/${order.id}`)
                )}
              />
            );
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
