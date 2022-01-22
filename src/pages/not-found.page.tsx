import { Flex, Text, useMediaQuery } from '@chakra-ui/react';

export const NotFound = () => {
  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  return (
    <Flex
      w="full"
      h="95vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Text color="green.600" fontSize={isLessThan920 ? 'xl' : '3xl'} as="b">
        Похоже, что этой страницы не существует...
      </Text>
    </Flex>
  );
};

export default NotFound;
