import { Table, Tbody, Td, Tr } from '@chakra-ui/react';

import OrderStatusBadgeMenu from '@components/order-status-badge-menu.component';
import { getOrderNumber } from '@app/utils';

import { Order, Purchase } from '@app/declarations';

interface OrderInfoProps {
  order: Order | undefined;
}

export const OrderInfo = ({ order }: OrderInfoProps) => {
  const orderData = order || ({} as Order);

  return (
    <Table variant="striped" mb="2rem">
      <Tbody>
        <Tr>
          <Td>Номер заказа</Td>
          <Td>#{getOrderNumber(orderData.id)}</Td>
        </Tr>
        <Tr>
          <Td>Дата оформления</Td>
          <Td>
            {new Date(orderData.createdAt || Date.now()).toLocaleString('ru')}
          </Td>
        </Tr>
        <Tr>
          <Td>Статус</Td>
          <Td>
            <OrderStatusBadgeMenu
              orderId={orderData.id}
              status={orderData.status}
            />
          </Td>
        </Tr>
        <Tr>
          <Td>ФИО</Td>
          <Td>
            {orderData.lastname} {orderData.firstname}
          </Td>
        </Tr>
        <Tr>
          <Td>Телефон</Td>
          <Td>+7 {orderData.phone}</Td>
        </Tr>
        <Tr>
          <Td>Адрес доставки</Td>
          <Td>
            г. {orderData.address?.city}, ул. {orderData.address?.street}, д.{' '}
            {orderData.address?.house}
          </Td>
        </Tr>
        <Tr>
          <Td>Почтовый индекс</Td>
          <Td>{orderData.address?.postcode}</Td>
        </Tr>
        <Tr>
          <Td>Сумма</Td>
          <Td>
            {(orderData.purchases || [])
              .reduce(
                (sum: number, purchase: Purchase) =>
                  sum + +purchase.product.price,
                0
              )
              .toLocaleString('ru')}{' '}
            ₽
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default OrderInfo;
