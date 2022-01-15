import { Flex, Tooltip } from '@chakra-ui/react';

import { NavlinkData } from '../declarations';

interface NavlinkProps {
  data: NavlinkData;
}

export const Navlink = ({ data }: NavlinkProps) => {
  return (
    <Tooltip label={data.text} placement="right">
      <Flex
        padding="1rem"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        _hover={{ backgroundColor: '#254125' }}
      >
        {data.icon}
      </Flex>
    </Tooltip>
  );
};

export default Navlink;
