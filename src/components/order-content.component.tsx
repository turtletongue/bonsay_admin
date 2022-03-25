import { Table, Tbody } from '@chakra-ui/react';

import TableHead from '@components/table-head.component';
import TableRow from '@components/table-row.component';
import getPurchaseTableData from '@app/table-data/get-purchases-table-data';

import { Order, Purchase } from '@app/declarations';

interface OrderContentProps {
  order: Order | undefined;
}

export const OrderContent = ({ order }: OrderContentProps) => {
  const orderData = order || ({} as Order);

  return (
    <Table>
      <TableHead titles={['ID', 'Изображение', 'Название', 'Цена']} />
      <Tbody>
        {(orderData.purchases || []).map((purchase: Purchase) => {
          return (
            <TableRow key={purchase.id} data={getPurchaseTableData(purchase)} />
          );
        })}
      </Tbody>
    </Table>
  );
};

export default OrderContent;
