import { useEffect } from 'react';
import { Table, Tbody, useToast } from '@chakra-ui/react';

import TableHead from '@components/table-head.component';
import TableRow from '@components/table-row.component';
import Pagination from '@components/pagination.component';
import LoadingHandler from '@components/loading-handler.component';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  clearDelete,
  deleteAdmin,
  fetchAdmins,
  selectAdmins,
  selectCreateSuccess,
  selectDeleteError,
  selectDeleteSuccess,
  selectIsLoading,
  selectPage,
  selectTotal,
  setPage,
} from '@store/admins/admins.slice';
import { selectAccessToken, selectUser } from '@store/core/core.slice';
import getAdminsTableData from '@app/table-data/get-admins-table-data';

import { Id } from '@app/declarations';

export const Admins = () => {
  const pageNumber = useAppSelector(selectPage);

  const admins = useAppSelector(selectAdmins);
  const total = useAppSelector(selectTotal);
  const adminCreateSuccess = useAppSelector(selectCreateSuccess);
  const adminDeleteSuccess = useAppSelector(selectDeleteSuccess);
  const adminDeleteError = useAppSelector(selectDeleteError);

  const accessToken = useAppSelector(selectAccessToken);

  const toast = useToast();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchAdmins({ page: pageNumber, accessToken }));
    }
  }, [dispatch, pageNumber, accessToken]);

  useEffect(() => {
    if (accessToken && (adminCreateSuccess || adminDeleteSuccess)) {
      dispatch(fetchAdmins({ page: pageNumber, accessToken }));
    }
  }, [
    dispatch,
    pageNumber,
    accessToken,
    adminCreateSuccess,
    adminDeleteSuccess,
  ]);

  useEffect(() => {
    if (adminDeleteSuccess) {
      toast({
        title: 'Администратор удалён.',
        status: 'success',
        position: 'bottom-right',
      });

      dispatch(clearDelete());
    }
  }, [dispatch, toast, adminDeleteSuccess]);

  useEffect(() => {
    if (adminDeleteError) {
      toast({
        title: 'Что-пошло не так.',
        status: 'error',
        position: 'bottom-right',
      });

      dispatch(clearDelete());
    }
  }, [dispatch, toast, adminDeleteError]);

  const user = useAppSelector(selectUser);

  const onDelete = (adminId: Id) => {
    if (accessToken) {
      dispatch(deleteAdmin({ adminId: adminId, accessToken }));
    }
  };

  const isLoading = useAppSelector(selectIsLoading);

  const onPageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <LoadingHandler isLoading={isLoading}>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead titles={['ID', 'Email', 'Дата создания', 'Действия']} />
        <Tbody>
          {admins.map((admin) => {
            return (
              <TableRow
                key={admin.id}
                data={getAdminsTableData(admin, user, onDelete)}
              />
            );
          })}
        </Tbody>
      </Table>
      <Pagination
        pageNumber={pageNumber}
        total={total}
        setPage={onPageChange}
      />
    </LoadingHandler>
  );
};

export default Admins;
