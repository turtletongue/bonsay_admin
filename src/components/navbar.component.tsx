import { VStack } from '@chakra-ui/react';

import Navlink from './navlink.component';

import { NavlinkData } from '../declarations';

interface NavbarProps {
  links: NavlinkData[];
}

export const Navbar = ({ links }: NavbarProps) => {
  return (
    <VStack
      direction="column"
      backgroundColor="#627A52"
      height="100vh"
      width="3.5rem"
      alignItems="center"
      spacing={0}
    >
      {links.map((link) => (
        <Navlink key={link.text} data={link} />
      ))}
    </VStack>
  );
};

export default Navbar;
