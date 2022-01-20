import { Button, Icon } from '@chakra-ui/react';
import { BsFillPencilFill } from 'react-icons/bs';

interface EditButtonProps {
  onClick?: (...args: unknown[]) => void;
}

export const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <Button marginTop="1rem" onClick={onClick}>
      <Icon as={BsFillPencilFill} w={3} h={3} />
    </Button>
  );
};

export default EditButton;
