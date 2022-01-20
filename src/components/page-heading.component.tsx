import { ChangeEventHandler } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box, Divider, Flex, Text, useMediaQuery } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectSearch, setSearch } from '../store/products/products.slice';
import AddItemModal from './add-item-modal.component';
import AddProductForm from './add-product-form.component';
import AddCategoryForm from './add-category-form.component';
import AddAdminForm from './add-admin-form.component';
import Search from './search.component';

interface PageHeadingProps {
  title?: string;
}

export const PageHeading = ({ title }: PageHeadingProps) => {
  const { pathname } = useLocation();
  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  const isCanAddRows = pathname !== '/clients' && pathname !== '/orders';
  const hasSearch = pathname === '/products' || pathname === '/categories';

  const dispatch = useAppDispatch();

  const productsSearch = useAppSelector(selectSearch);
  const onProductsSearchChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(setSearch(event.target.value));
  };

  return (
    <>
      {title && (
        <Box width="full" paddingX="1.5rem" paddingY="1rem">
          <Flex
            w="full"
            justifyContent="space-between"
            alignItems="center"
            direction={isLessThan920 ? 'column' : 'row'}
          >
            <Flex w="full" justifyContent="space-between" alignItems="center">
              <Text fontSize="md" color="#254125" marginRight="1rem">
                {title}
              </Text>
              {isCanAddRows && (
                <AddItemModal>
                  <Routes>
                    <Route path="products" element={<AddProductForm />} />
                    <Route path="categories" element={<AddCategoryForm />} />
                    <Route path="admins" element={<AddAdminForm />} />
                  </Routes>
                </AddItemModal>
              )}
            </Flex>
            {hasSearch && (
              <Routes>
                <Route
                  path="products"
                  element={
                    <Search
                      value={productsSearch}
                      onChange={onProductsSearchChange}
                    />
                  }
                />
              </Routes>
            )}
          </Flex>
          <Divider color="#254125" marginTop="1rem" />
        </Box>
      )}
    </>
  );
};

export default PageHeading;
