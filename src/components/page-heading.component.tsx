import { Box, Divider, Text } from '@chakra-ui/react';

interface PageHeadingProps {
  title?: string;
}

export const PageHeading = ({ title }: PageHeadingProps) => {
  return (
    <>
      {title && (
        <Box width="full" paddingX="1.5rem" paddingY="1rem">
          <Text fontSize="md" color="#254125">
            {title}
          </Text>
          <Divider color="#254125" marginTop="1rem" />
        </Box>
      )}
    </>
  );
};

export default PageHeading;
