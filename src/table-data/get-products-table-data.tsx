import { Image } from '@chakra-ui/react';

import DeleteConfirmationModal from '@components/delete-confirmation-modal.component';
import EditProductForm from '@components/edit-product-form.component';
import EditItemModal from '@components/edit-item-modal.component';
import { DEFAULT_IMAGE_PATH } from '@app/variables';

import { Id, Product } from '@app/declarations';

export const getProductsTableData = (
  product: Product,
  onDelete: (productId: Id) => unknown
) => {
  return [
    {
      id: 1,
      node: (
        <Image
          boxSize="5rem"
          objectFit="cover"
          src={product.path || DEFAULT_IMAGE_PATH}
          alt={product.name}
        />
      ),
      title: 'Картинка',
    },
    { id: 2, node: product.name, title: 'Название' },
    {
      id: 3,
      node: `${Number(product.price).toLocaleString()} ₽`,
      title: 'Цена',
    },
    {
      id: 4,
      node: (
        <>
          <EditItemModal id={product.id}>
            <EditProductForm product={product} />
          </EditItemModal>
          <DeleteConfirmationModal onDelete={() => onDelete(product.id)} />
        </>
      ),
      title: 'Действия',
    },
  ];
};

export default getProductsTableData;
