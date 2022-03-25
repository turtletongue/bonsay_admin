import { Image } from '@chakra-ui/react';

import { DEFAULT_IMAGE_PATH } from '@app/variables';

import { Purchase } from '@app/declarations';

export const getPurchaseTableData = (purchase: Purchase) => {
  return [
    {
      id: 1,
      node: purchase.id,
      title: 'ID',
    },
    {
      id: 2,
      node: (
        <Image
          boxSize="5rem"
          objectFit="cover"
          src={purchase.product.upload?.path || DEFAULT_IMAGE_PATH}
          alt={purchase.product.name}
        />
      ),
      title: 'Изображение',
    },
    {
      id: 3,
      node: purchase.product.name,
      title: 'Название',
    },
    {
      id: 4,
      node: `${(+purchase.product.price).toLocaleString('ru')} ₽`,
      title: 'Цена',
    },
  ];
};

export default getPurchaseTableData;
