import { useEffect } from 'react';
import { Table, Tbody, useToast } from '@chakra-ui/react';

import TableHead from '@components/table-head.component';
import TableRow from '@components/table-row.component';
import LoadingHandler from '@components/loading-handler.component';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  clearDelete,
  deleteCategory,
  fetchCategories,
  selectCategories,
  selectCreateSuccess,
  selectDeleteError,
  selectDeleteSuccess,
  selectEditSuccess,
  selectIsLoading,
} from '@store/categories/categories.slice';
import { selectAccessToken } from '@store/core/core.slice';
import { getCategoriesTableData } from '@app/table-data/get-categories-table-data';

import { Id } from '@app/declarations';

export const Categories = () => {
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
  const onDelete = (categoryId: Id) => {
    if (accessToken) {
      dispatch(deleteCategory({ categoryId, accessToken }));
    }
  };

  const isLoading = useAppSelector(selectIsLoading);

  return (
    <LoadingHandler isLoading={isLoading}>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead titles={['Картинка', 'Название', 'Действия']} />
        <Tbody>
          {categories.map((category) => {
            return (
              <TableRow
                key={category.id}
                data={getCategoriesTableData(category, onDelete)}
              />
            );
          })}
        </Tbody>
      </Table>
    </LoadingHandler>
  );
};

export default Categories;
