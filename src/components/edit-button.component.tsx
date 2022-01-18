import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { BsFillPencilFill } from 'react-icons/bs';

export const EditButton = () => {
  return (
    <Tooltip label="Редактировать" placement="top">
      <Button marginTop="1rem">
        <Icon as={BsFillPencilFill} w={3} h={3} />
      </Button>
    </Tooltip>
  );
};

export default EditButton;
