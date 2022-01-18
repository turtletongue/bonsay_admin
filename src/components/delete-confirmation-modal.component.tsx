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
import { BsTrashFill } from 'react-icons/bs';

export const DeleteConfirmationModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label="Удалить" placement="top">
        <Button
          colorScheme="red"
          marginLeft="1rem"
          marginTop="1rem"
          onClick={onOpen}
        >
          <Icon as={BsTrashFill} w={3} h={3} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Вы действительно хотите продолжить?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize="md">
              Данные будут удалены без возможности восстановления.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Отмена
            </Button>
            <Button colorScheme="red">Удалить</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
