import { ChangeEventHandler, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import {
  Box,
  Divider,
  Flex,
  Select,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';

import AddItemModal from '@components/add-item-modal.component';
import AddProductForm from '@components/add-product-form.component';
import AddCategoryForm from '@components/add-category-form.component';
import AddAdminForm from '@components/add-admin-form.component';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  fetchCategories,
  selectCategories,
} from '@store/categories/categories.slice';
import { setCategoryFilter } from '@store/products/products.slice';
import { DEFAULT_FETCH_LIMIT } from '@app/variables';
import { setStatusFilter } from '@store/orders/orders.slice';

interface PageHeadingProps {
  title?: string;
}

export const PageHeading = ({ title }: PageHeadingProps) => {
  const { pathname } = useLocation();
  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  const categories = useAppSelector(selectCategories);

  const isCanAddRows =
    pathname === '/products' ||
    pathname === '/admins' ||
    (pathname === '/categories' && categories.length < DEFAULT_FETCH_LIMIT);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onCategoryIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch(setCategoryFilter(event.target.value));
  };

  const onOrderStatusChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    dispatch(setStatusFilter(event.target.value));
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
            <Routes>
              <Route
                path="products"
                element={
                  <Select
                    onChange={onCategoryIdChange}
                    maxW="15rem"
                    marginTop={isLessThan920 ? '1rem' : 0}
                    marginLeft="1rem"
                  >
                    <option value="-1">Все</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                }
              />
              <Route
                path="orders"
                element={
                  <Select
                    onChange={onOrderStatusChange}
                    maxW="15rem"
                    marginTop={isLessThan920 ? '1rem' : 0}
                    marginLeft="1rem"
                  >
                    <option value="-1">Все</option>
                    <option value="processing">Обработка</option>
                    <option value="delivery">Доставка</option>
                    <option value="completed">Завершены</option>
                    <option value="cancelled">Отменены</option>
                  </Select>
                }
              />
            </Routes>
          </Flex>
          <Divider color="#254125" marginTop="1rem" />
        </Box>
      )}
    </>
  );
};

export default PageHeading;
