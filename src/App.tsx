import { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import Navbar from './components/navbar.component';
import PageHeading from './components/page-heading.component';
import { navlinks } from './navlinks.config';
interface AppProps {
  children?: ReactNode;
}

const App = ({ children }: AppProps) => {
  const { pathname } = useLocation();

  return (
    <Flex width="full">
      <Navbar links={navlinks} />
      <Box width="full">
        <PageHeading
          title={navlinks.find((navlink) => navlink.href === pathname)?.text}
        />
        <Box>{children}</Box>
      </Box>
    </Flex>
  );
};

export default App;
