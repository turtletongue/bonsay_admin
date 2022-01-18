import { Route, Routes, useLocation } from 'react-router-dom';
import {
  Box,
  Divider,
  Flex,
  Input,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';

import AddItemModal from './add-item-modal.component';
import AddProductForm from './add-product-form.component';
import AddCategoryForm from './add-category-form.component';
import AddAdminForm from './add-admin-form.component';

interface PageHeadingProps {
  title?: string;
}

export const PageHeading = ({ title }: PageHeadingProps) => {
  const { pathname } = useLocation();
  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  const isCanAddRows = pathname !== '/clients' && pathname !== '/orders';

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
            <Input
              type="search"
              placeholder="Поиск"
              maxW="20rem"
              marginTop={isLessThan920 ? '1rem' : 0}
              marginLeft="1rem"
            />
          </Flex>
          <Divider color="#254125" marginTop="1rem" />
        </Box>
      )}
    </>
  );
};

export default PageHeading;
