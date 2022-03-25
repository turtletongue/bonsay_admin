import { Link, useMatch } from 'react-router-dom';
import { Flex, Tooltip } from '@chakra-ui/react';

import { NavlinkData } from '@app/declarations';

interface NavlinkProps {
  data: NavlinkData;
}

export const Navlink = ({ data }: NavlinkProps) => {
  const isActive = !!useMatch(data.href);

  return (
    <Tooltip label={data.text} placement="right">
      <Link to={data.href}>
        <Flex
          padding="1rem"
          justifyContent="center"
          alignItems="center"
          _hover={{ backgroundColor: '#254125' }}
        >
          {data.icon(isActive)}
        </Flex>
      </Link>
    </Tooltip>
  );
};

export default Navlink;
