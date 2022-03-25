import { Button, Icon } from '@chakra-ui/react';
import { BsCardText } from 'react-icons/bs';

interface ContentButtonProps {
  onClick?: (...args: unknown[]) => void;
}

export const ContentButton = ({ onClick }: ContentButtonProps) => {
  return (
    <Button marginTop="1rem" colorScheme="blue" onClick={onClick}>
      <Icon as={BsCardText} w={5} h={5} />
    </Button>
  );
};

export default ContentButton;
