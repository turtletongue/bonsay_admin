import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Box, Table, Tbody, useToast } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  clearDelete,
  deleteAdmin,
  fetchAdmins,
  selectAdmins,
  selectCreateSuccess,
  selectDeleteError,
  selectDeleteSuccess,
  selectTotal,
} from '../store/admins/admins.slice';
import { selectAccessToken, selectUser } from '../store/core/core.slice';
import TableHead from '../components/table-head.component';
import TableRow from '../components/table-row.component';
import Pagination from '../components/pagination.component';
import DeleteConfirmationModal from '../components/delete-confirmation-modal.component';
import DeleteButton from '../components/delete-button.component';

import { User } from '../declarations';

export const Admins = () => {
  const [params] = useSearchParams();
  const pageNumber = Number(params.get('page')) || 1;

  const { pathname } = useLocation();

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

  const getData = (admin: User) => {
    const onDelete = () => {
      if (accessToken) {
        dispatch(deleteAdmin({ adminId: admin.id, accessToken }));
      }
    };

    return [
      { id: 1, node: admin.id, title: 'ID' },
      { id: 2, node: admin.email, title: 'Email' },
      {
        id: 3,
        node: new Date(admin.createdAt || Date.now()).toLocaleString(),
        title: 'Дата создания',
      },
      {
        id: 4,
        node:
          admin.id !== user?.id ? (
            <DeleteConfirmationModal onDelete={onDelete} />
          ) : (
            <DeleteButton isDisabled />
          ),
        title: 'Действия',
      },
    ];
  };

  return (
    <Box>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead titles={['ID', 'Email', 'Дата создания', 'Действия']} />
        <Tbody>
          {admins.map((admin) => {
            return <TableRow key={admin.id} data={getData(admin)} />;
          })}
        </Tbody>
      </Table>
      <Pagination pageNumber={pageNumber} url={pathname} total={total} />
    </Box>
  );
};

export default Admins;
