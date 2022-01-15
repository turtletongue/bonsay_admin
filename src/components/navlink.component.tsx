import { Link, useMatch } from 'react-router-dom';
import { Flex, Tooltip } from '@chakra-ui/react';

import { NavlinkData } from '../declarations';

interface NavlinkProps {
  data: NavlinkData;
}

export const Navlink = ({ data }: NavlinkProps) => {
  const isActive = !!useMatch(data.href);

  return (
    <Tooltip label={data.text} placement="right" isDisabled={isActive}>
      <Link to={data.href}>
        <Flex
          padding="1rem"
          justifyContent="center"
          alignItems="center"
          cursor={isActive ? 'default' : 'pointer'}
          _hover={{ backgroundColor: isActive ? '#627A52' : '#254125' }}
        >
          {data.icon(isActive)}
        </Flex>
      </Link>
    </Tooltip>
  );
};

export default Navlink;
