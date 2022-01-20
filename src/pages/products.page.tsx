import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Box, Image, Table, Tbody } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchProducts,
  selectProducts,
  selectSearch,
  selectTotal,
  selectSuccess,
} from '../store/products/products.slice';
import TableHead from '../components/table-head.component';
import TableRow from '../components/table-row.component';
import Pagination from '../components/pagination.component';
import DeleteConfirmationModal from '../components/delete-confirmation-modal.component';
import EditItemModal from '../components/edit-item-modal.component';
import EditProductForm from '../components/edit-product-form.component';
import { DEFAULT_IMAGE_PATH } from '../variables';

import { Product } from '../declarations';

export const Products = () => {
  const [params] = useSearchParams();
  const pageNumber = Number(params.get('page')) || 1;

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const total = useAppSelector(selectTotal);
  const search = useAppSelector(selectSearch);
  const productCreationSuccess = useAppSelector(selectSuccess);

  useEffect(() => {
    dispatch(fetchProducts({ page: pageNumber, filters: { search } }));
  }, [dispatch, pageNumber, search]);

  useEffect(() => {
    if (productCreationSuccess) {
      dispatch(fetchProducts({ page: pageNumber, filters: { search } }));
    }
  }, [dispatch, pageNumber, search, productCreationSuccess]);

  const getData = (product: Product) => {
    return [
      {
        id: 1,
        node: (
          <Image
            boxSize="5rem"
            objectFit="cover"
            src={product.path || product.upload?.path || DEFAULT_IMAGE_PATH}
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
            <EditItemModal>
              <EditProductForm />
            </EditItemModal>
            <DeleteConfirmationModal />
          </>
        ),
        title: 'Действия',
      },
    ];
  };

  return (
    <Box>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead titles={['Картинка', 'Название', 'Цена', 'Действия']} />
        <Tbody>
          {products.map((product) => {
            return <TableRow key={product.id} data={getData(product)} />;
          })}
        </Tbody>
      </Table>
      <Pagination pageNumber={pageNumber} url={pathname} total={total} />
    </Box>
  );
};

export default Products;
