import { ReactNode, useCallback, useEffect } from 'react';
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

import { clearWriteData as clearProductWriteData } from '@store/products/products.slice';
import { clearWriteData as clearCategoryWriteData } from '@store/categories/categories.slice';
import { useAppDispatch, useCreate } from '@store/hooks';
import { slicesNames } from '@app/variables';

import { SliceName } from '@app/declarations';

interface AddItemModalProps {
  children?: ReactNode;
}

export const AddItemModal = ({ children }: AddItemModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const closeWithClear = useCallback(() => {
    onClose();

    dispatch(clearProductWriteData());
    dispatch(clearCategoryWriteData());
  }, [dispatch, onClose]);

  const sliceName = pathname.slice(1);

  const [onSave, successEffect, errorEffect] = useCreate({
    sliceName: slicesNames.includes(sliceName)
      ? (sliceName as SliceName)
      : 'products',
    onSuccess: () => {
      closeWithClear();
    },
  });

  useEffect(successEffect, [successEffect]);
  useEffect(errorEffect, [errorEffect]);

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        <Icon as={AiOutlinePlus} w={6} h={6} />
      </Button>
      <Modal isOpen={isOpen} onClose={closeWithClear}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавление данных</ModalHeader>
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

export default AddItemModal;
