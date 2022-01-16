import { Box, Divider, Flex, Input, Text } from '@chakra-ui/react';

interface PageHeadingProps {
  title?: string;
}

export const PageHeading = ({ title }: PageHeadingProps) => {
  return (
    <>
      {title && (
        <Box width="full" paddingX="1.5rem" paddingY="1rem">
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Text fontSize="md" color="#254125" marginRight="1rem">
              {title}
            </Text>
            <Input type="search" placeholder="Поиск" maxW="20rem" />
          </Flex>
          <Divider color="#254125" marginTop="1rem" />
        </Box>
      )}
    </>
  );
};

export default PageHeading;
