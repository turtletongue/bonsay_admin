import { useEffect } from 'react';
import { Image, Table, Tbody, useToast } from '@chakra-ui/react';

import TableHead from '@components/table-head.component';
import TableRow from '@components/table-row.component';
import Pagination from '@components/pagination.component';
import DeleteConfirmationModal from '@components/delete-confirmation-modal.component';
import EditItemModal from '@components/edit-item-modal.component';
import EditProductForm from '@components/edit-product-form.component';
import LoadingHandler from '@components/loading-handler.component';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  fetchProducts,
  selectProducts,
  selectSearch,
  selectTotal,
  selectCreateSuccess,
  deleteProduct,
  selectDeleteSuccess,
  selectDeleteError,
  clearDelete,
  selectEditSuccess,
  selectIsLoading,
  selectPage,
  setPage,
} from '@store/products/products.slice';
import { selectAccessToken } from '@store/core/core.slice';
import { DEFAULT_IMAGE_PATH } from '@app/variables';

import { Product } from '@app/declarations';

export const Products = () => {
  const pageNumber = useAppSelector(selectPage);

  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const total = useAppSelector(selectTotal);
  const search = useAppSelector(selectSearch);
  const productCreateSuccess = useAppSelector(selectCreateSuccess);
  const productDeleteSuccess = useAppSelector(selectDeleteSuccess);
  const productEditSuccess = useAppSelector(selectEditSuccess);
  const productDeleteError = useAppSelector(selectDeleteError);

  const accessToken = useAppSelector(selectAccessToken);

  const toast = useToast();

  useEffect(() => {
    dispatch(fetchProducts({ page: pageNumber, filters: { search } }));
  }, [dispatch, pageNumber, search]);

  useEffect(() => {
    if (productCreateSuccess || productDeleteSuccess || productEditSuccess) {
      dispatch(fetchProducts({ page: pageNumber, filters: { search } }));

      dispatch(setPage(1));
    }
  }, [
    dispatch,
    pageNumber,
    search,
    productCreateSuccess,
    productDeleteSuccess,
    productEditSuccess,
  ]);

  useEffect(() => {
    setPage(1);
  }, [dispatch]);

  useEffect(() => {
    if (productDeleteSuccess) {
      toast({
        title: 'Товар удалён.',
        status: 'success',
        position: 'bottom-right',
      });

      dispatch(clearDelete());
    }
  }, [dispatch, toast, productDeleteSuccess]);

  useEffect(() => {
    if (productDeleteError) {
      toast({
        title: 'Что-пошло не так.',
        status: 'error',
        position: 'bottom-right',
      });

      dispatch(clearDelete());
    }
  }, [dispatch, toast, productDeleteError]);

  const getData = (product: Product) => {
    const onDelete = () => {
      if (accessToken) {
        dispatch(deleteProduct({ productId: product.id, accessToken }));
      }
    };

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
            <DeleteConfirmationModal onDelete={onDelete} />
          </>
        ),
        title: 'Действия',
      },
    ];
  };

  const onPageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const isLoading = useAppSelector(selectIsLoading);

  return (
    <LoadingHandler isLoading={isLoading}>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead titles={['Картинка', 'Название', 'Цена', 'Действия']} />
        <Tbody>
          {products.map((product) => {
            return <TableRow key={product.id} data={getData(product)} />;
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

export default Products;
