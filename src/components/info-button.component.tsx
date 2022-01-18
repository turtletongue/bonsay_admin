import { Button, Icon } from '@chakra-ui/react';
import { AiOutlineInfo } from 'react-icons/ai';

export const InfoButton = () => {
  return (
    <Button marginTop="1rem">
      <Icon as={AiOutlineInfo} color="blue.500" w={4} h={4} />
    </Button>
  );
};

export default InfoButton;
