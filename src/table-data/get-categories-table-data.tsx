import { Image } from '@chakra-ui/react';

import EditItemModal from '@components/edit-item-modal.component';
import EditCategoryForm from '@components/edit-category-form.component';
import DeleteConfirmationModal from '@components/delete-confirmation-modal.component';
import { DEFAULT_IMAGE_PATH } from '@app/variables';

import { Category, Id } from '@app/declarations';

export const getCategoriesTableData = (
  category: Category,
  onDelete: (categoryId: Id) => unknown
) => {
  return [
    {
      id: 1,
      node: (
        <Image
          boxSize="5rem"
          objectFit="cover"
          src={category.path || DEFAULT_IMAGE_PATH}
          alt={category.name}
        />
      ),
      title: 'Картинка',
    },
    { id: 2, node: category.name, title: 'Название' },
    {
      id: 3,
      node: (
        <>
          <EditItemModal id={category.id}>
            <EditCategoryForm category={category} />
          </EditItemModal>
          <DeleteConfirmationModal onDelete={() => onDelete(category.id)} />
        </>
      ),
      title: 'Действия',
    },
  ];
};
