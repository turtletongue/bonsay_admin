import {
  Button,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Icon,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import { AiOutlineCheck } from 'react-icons/ai';

export const CompleteConfirmationModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label="Выполнить" placement="top">
        <Button
          colorScheme="green"
          marginLeft="1rem"
          marginTop="1rem"
          onClick={onOpen}
        >
          <Icon as={AiOutlineCheck} w={4} h={4} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Вы действительно хотите продолжить?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize="md">Данные будут скрыты из панели.</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Отмена
            </Button>
            <Button colorScheme="green">Пометить выполненным</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompleteConfirmationModal;
