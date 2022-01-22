import { Flex, Text, useMediaQuery } from '@chakra-ui/react';

export const Error = () => {
  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  return (
    <Flex
      w="full"
      h="80vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Text color="green.600" fontSize={isLessThan920 ? 'xl' : '3xl'} as="b">
        Что-то пошло не так...
      </Text>
    </Flex>
  );
};

export default Error;
