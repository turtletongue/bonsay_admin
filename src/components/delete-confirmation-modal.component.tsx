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
  useDisclosure,
} from '@chakra-ui/react';

import DeleteButton from '@components/delete-button.component';

interface DeleteConfirmationModalProps {
  onDelete?: () => void;
}

export const DeleteConfirmationModal = ({
  onDelete,
}: DeleteConfirmationModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDeleteButtonClicked = () => {
    if (onDelete) {
      onDelete();
    }

    onClose();
  };

  return (
    <>
      <DeleteButton onClick={onOpen} />
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
            <Button colorScheme="red" onClick={onDeleteButtonClicked}>
              Удалить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
