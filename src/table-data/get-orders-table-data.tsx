import OrderStatusBadgeMenu from '@components/order-status-badge-menu.component';
import ContentButton from '@components/content-button.component';
import { getOrderNumber } from '@app/utils';

import { Order } from '@app/declarations';

export const getOrdersTableData = (
  order: Order,
  onButtonClick: () => unknown
) => {
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
      node: <OrderStatusBadgeMenu orderId={order.id} status={order.status} />,
      title: 'Статус',
    },
    {
      id: 4,
      node: new Date(order.createdAt || Date.now()).toLocaleString('ru'),
      title: 'Дата',
    },
    {
      id: 5,
      node: <ContentButton onClick={onButtonClick} />,
      title: 'Подробнее',
    },
  ];
};

export default getOrdersTableData;
