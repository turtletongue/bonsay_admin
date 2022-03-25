import BadgeMenu from '@components/badge-menu.component';
import { patchOrder } from '@store/orders/orders.slice';
import { selectAccessToken } from '@store/core/core.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { orderBadgeColor, orderStatus } from '@app/variables';

import { Id, OrderStatus } from '@app/declarations';

interface OrderStatusBadgeMenuProps {
  orderId: Id;
  status: OrderStatus;
}

export const OrderStatusBadgeMenu = ({
  orderId,
  status,
}: OrderStatusBadgeMenuProps) => {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector(selectAccessToken);

  const changeOrderStatus = (orderId: Id, status: OrderStatus) => {
    dispatch(patchOrder({ data: { id: orderId, status }, accessToken }));
  };

  return (
    <BadgeMenu
      defaultBadge={{
        id: 0,
        content: {
          color: orderBadgeColor[status],
          text: orderStatus[status],
        },
      }}
      badges={[
        {
          id: 1,
          content: {
            color: 'blue',
            text: 'Обработка',
          },
          onClick: () => changeOrderStatus(orderId, 'processing'),
        },
        {
          id: 2,
          content: {
            color: 'yellow',
            text: 'Доставка',
          },
          onClick: () => changeOrderStatus(orderId, 'delivery'),
        },
        {
          id: 3,
          content: {
            color: 'green',
            text: 'Завершён',
          },
          onClick: () => changeOrderStatus(orderId, 'completed'),
        },
        {
          id: 4,
          content: {
            color: 'red',
            text: 'Отменён',
          },
          onClick: () => changeOrderStatus(orderId, 'cancelled'),
        },
      ].filter((badge) => badge.content.color !== orderBadgeColor[status])}
    />
  );
};

export default OrderStatusBadgeMenu;
