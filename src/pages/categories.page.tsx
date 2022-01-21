import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Box, Image, Table, Tbody, useToast } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  clearDelete,
  deleteCategory,
  fetchCategories,
  selectCategories,
  selectCreateSuccess,
  selectDeleteError,
  selectDeleteSuccess,
  selectEditSuccess,
} from '../store/categories/categories.slice';
import { DEFAULT_IMAGE_PATH } from '../variables';
import TableHead from '../components/table-head.component';
import TableRow from '../components/table-row.component';
import Pagination from '../components/pagination.component';
import DeleteConfirmationModal from '../components/delete-confirmation-modal.component';
import EditItemModal from '../components/edit-item-modal.component';
import EditCategoryForm from '../components/edit-category-form.component';

import { Category } from '../declarations';
import { selectAccessToken } from '../store/core/core.slice';

export const Categories = () => {
  const [params] = useSearchParams();
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const toast = useToast();

  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryCreateSuccess = useAppSelector(selectCreateSuccess);
  const categoryDeleteSuccess = useAppSelector(selectDeleteSuccess);
  const categoryEditSuccess = useAppSelector(selectEditSuccess);
  const categoryDeleteError = useAppSelector(selectDeleteError);

  useEffect(() => {
    if (categoryCreateSuccess || categoryDeleteSuccess || categoryEditSuccess) {
      dispatch(fetchCategories());
    }
  }, [
    dispatch,
    categoryCreateSuccess,
    categoryDeleteSuccess,
    categoryEditSuccess,
  ]);

  useEffect(() => {
    if (categoryDeleteSuccess) {
      toast({
        title: 'Категория удалена.',
        status: 'success',
        position: 'bottom-right',
      });

      dispatch(clearDelete());
    }
  }, [dispatch, toast, categoryDeleteSuccess]);

  useEffect(() => {
    if (categoryDeleteError) {
      toast({
        title: 'Что-пошло не так.',
        status: 'error',
        position: 'bottom-right',
      });

      dispatch(clearDelete());
    }
  }, [dispatch, toast, categoryDeleteError]);

  const accessToken = useAppSelector(selectAccessToken);

  const getData = (category: Category) => {
    const onDelete = () => {
      if (accessToken) {
        dispatch(deleteCategory({ categoryId: category.id, accessToken }));
      }
    };

    return [
      {
        id: 1,
        node: (
          <Image
            boxSize="5rem"
            objectFit="cover"
            src={category.path || category.upload?.path || DEFAULT_IMAGE_PATH}
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
            <DeleteConfirmationModal onDelete={onDelete} />
          </>
        ),
        title: 'Действия',
      },
    ];
  };

  return (
    <Box>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead titles={['Картинка', 'Название', 'Действия']} />
        <Tbody>
          {categories.map((category) => {
            return <TableRow key={category.id} data={getData(category)} />;
          })}
        </Tbody>
      </Table>
      <Pagination
        pageNumber={Number(params.get('page')) || 1}
        url={pathname}
        total={categories.length}
      />
    </Box>
  );
};

export default Categories;
