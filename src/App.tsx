import { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Products from './pages/products.page';
import Navbar from './components/navbar.component';
import PageHeading from './components/page-heading.component';
import { navlinks } from './navlinks.config';
interface AppProps {
  children?: ReactNode;
}

const App = ({ children }: AppProps) => {
  const { pathname } = useLocation();

  return (
    <Flex width="full" height="full">
      <Navbar links={navlinks} />
      <Box width="full" paddingLeft="3.5rem" paddingBottom="0.5rem">
        <PageHeading
          title={navlinks.find((navlink) => navlink.href === pathname)?.text}
        />
        <Routes>
          <Route index element={<Navigate to="products" />} />
          <Route path="products" element={<Products />} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default App;
