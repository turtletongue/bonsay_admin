import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, useMediaQuery } from '@chakra-ui/react';

import LoadingHandler from '@components/loading-handler.component';
import OrderInfo from '@components/order-info.component';
import OrderContent from '@components/order-content.component';
import {
  fetchOrder,
  selectIsLoading,
  selectOrder,
} from '@store/order/order.slice';
import { clearOrderEdit, selectEditSuccess } from '@store/orders/orders.slice';
import { selectAccessToken } from '@store/core/core.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export const Order = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const accessToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    dispatch(fetchOrder({ id, accessToken }));
  }, [dispatch, id, accessToken]);

  const orderEditSuccess = useAppSelector(selectEditSuccess);

  useEffect(() => {
    if (orderEditSuccess) {
      dispatch(fetchOrder({ id, accessToken }));

      dispatch(clearOrderEdit());
    }
  }, [dispatch, id, accessToken, orderEditSuccess]);

  const order = useAppSelector(selectOrder);
  const isLoading = useAppSelector(selectIsLoading);

  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  return (
    <LoadingHandler isLoading={isLoading}>
      <Box w="full" p="4">
        <OrderInfo order={order} />
        <Text
          fontSize="md"
          fontWeight="500"
          textAlign={isLessThan920 ? 'center' : 'start'}
          ml="4"
          mb="2"
        >
          Содержимое заказа
        </Text>
        <OrderContent order={order} />
      </Box>
    </LoadingHandler>
  );
};

export default Order;
