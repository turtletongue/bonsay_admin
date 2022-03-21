import { Box, Flex, Icon, Image } from '@chakra-ui/react';
import { BsTrashFill } from 'react-icons/bs';

import { Id } from '@app/declarations';

interface ImagePreviewProps {
  id: Id;
  uploadPath: string;
  onClick?: (uploadId: Id, ...args: unknown[]) => void;
}

export const ImagePreview = ({
  id,
  uploadPath,
  onClick,
}: ImagePreviewProps) => {
  return (
    <Flex w="full" justifyContent="center">
      <Box
        role="group"
        w="50%"
        position="relative"
        cursor="pointer"
        onClick={(...args) => onClick?.(id, ...args)}
      >
        <Image
          w="full"
          src={uploadPath}
          alt={uploadPath}
          _groupHover={{
            filter: 'brightness(50%)',
            transition:
              '0.25s filter ease-in-out, 0.25s -webkit-filter ease-in-out',
          }}
        />
        <Flex
          opacity={0}
          top={0}
          left={0}
          position="absolute"
          w="full"
          h="full"
          justifyContent="center"
          alignItems="center"
          transition="0.25s opacity ease-in-out"
          _groupHover={{ opacity: 1 }}
        >
          <Icon as={BsTrashFill} w={6} h={6} color="white" />
        </Flex>
      </Box>
    </Flex>
  );
};

export default ImagePreview;
