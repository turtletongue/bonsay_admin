import { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';

import Navbar from './components/navbar.component';
import { navlinks } from './navlinks.config';
interface AppProps {
  children?: ReactNode;
}

const App = ({ children }: AppProps) => {
  return (
    <Flex>
      <Navbar links={navlinks} />
      <Box>{children}</Box>
    </Flex>
  );
};

export default App;
