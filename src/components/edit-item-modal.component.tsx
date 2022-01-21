import { ReactNode, useCallback, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../store/hooks';
import { clearWriteData as clearProductWriteData } from '../store/products/products.slice';
import { clearWriteData as clearCategoryWriteData } from '../store/categories/categories.slice';
import EditButton from './edit-button.component';

import { Id, SliceName } from '../declarations';
import { useEdit } from '../store/hooks/useEdit';
import { slicesNames } from '../variables';

interface EditItemModalProps {
  id: Id;
  children?: ReactNode;
}

export const EditItemModal = ({ children, id }: EditItemModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const closeWithClear = useCallback(() => {
    onClose();

    dispatch(clearProductWriteData());
    dispatch(clearCategoryWriteData());
  }, [dispatch, onClose]);

  const { pathname } = useLocation();

  const sliceName = pathname.slice(1);

  const [onSave, successEffect, errorEffect] = useEdit({
    id,
    sliceName: slicesNames.includes(sliceName)
      ? (sliceName as SliceName)
      : 'products',
    onSuccess: () => {
      closeWithClear();
    },
    canEffect: isOpen,
  });

  useEffect(successEffect, [successEffect]);
  useEffect(errorEffect, [errorEffect]);

  return (
    <>
      <EditButton onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={closeWithClear}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Изменение данных</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>
          <ModalFooter>
            <Button onClick={onSave} colorScheme="green" mr={3}>
              Сохранить
            </Button>
            <Button onClick={closeWithClear}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditItemModal;
