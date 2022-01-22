import { Flex, Text } from '@chakra-ui/react';

export const Error = () => {
  return (
    <Flex w="full" h="80vh" justifyContent="center" alignItems="center">
      <Text color="green.600" fontSize="3xl" as="b">
        ЧТО-ТО ПОШЛО НЕ ТАК
      </Text>
    </Flex>
  );
};

export default Error;
