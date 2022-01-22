import { ReactNode } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';

interface LoadingHandlerProps {
  isLoading: boolean;
  children?: ReactNode;
}

export const LoadingHandler = ({
  isLoading,
  children,
}: LoadingHandlerProps) => {
  return (
    <Box w="full" h="full">
      {isLoading ? (
        <Flex w="full" h="80vh" justifyContent="center" alignItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.500"
            size="xl"
          />
        </Flex>
      ) : (
        children
      )}
    </Box>
  );
};

export default LoadingHandler;
