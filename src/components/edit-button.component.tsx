import { Button, Icon } from '@chakra-ui/react';
import { BsFillPencilFill } from 'react-icons/bs';

export const EditButton = () => {
  return (
    <Button marginTop="1rem">
      <Icon as={BsFillPencilFill} w={3} h={3} />
    </Button>
  );
};

export default EditButton;
