import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';

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
                <Button colorScheme="green">
                  <Icon as={AiOutlinePlus} w={6} h={6} />
                </Button>
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
