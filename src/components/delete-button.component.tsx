import { Button, Icon } from '@chakra-ui/react';
import { BsTrashFill } from 'react-icons/bs';

interface DeleteButtonProps {
  isDisabled?: boolean;
  onClick?: (...args: unknown[]) => unknown;
}

export const DeleteButton = ({ onClick, isDisabled }: DeleteButtonProps) => {
  return (
    <Button
      isDisabled={isDisabled}
      colorScheme="red"
      marginLeft="1rem"
      marginTop="1rem"
      onClick={onClick}
    >
      <Icon as={BsTrashFill} w={3} h={3} />
    </Button>
  );
};

export default DeleteButton;
