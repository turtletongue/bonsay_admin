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
  useToast,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  clearProductData,
  clearProductEdit,
  clearProductEditError,
  patchProduct,
  selectBirthdate,
  selectCategoryId,
  selectDescription,
  selectEditError,
  selectEditSuccess,
  selectHeight,
  selectName,
  selectPrice,
  selectUploadId,
} from '../store/products/products.slice';
import { selectAccessToken } from '../store/core/core.slice';
import EditButton from './edit-button.component';

import { Id } from '../declarations';

interface EditItemModalProps {
  id: Id;
  children?: ReactNode;
}

export const EditItemModal = ({ children, id }: EditItemModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const closeWithClear = useCallback(() => {
    onClose();

    dispatch(clearProductData());
  }, [dispatch, onClose]);

  const { pathname } = useLocation();

  const productName = useAppSelector(selectName);
  const productDescription = useAppSelector(selectDescription);
  const categoryId = useAppSelector(selectCategoryId);
  const productUploadId = useAppSelector(selectUploadId);
  const price = useAppSelector(selectPrice);
  const height = useAppSelector(selectHeight);
  const birthdate = useAppSelector(selectBirthdate);
  const productEditSuccess = useAppSelector(selectEditSuccess);
  const productEditError = useAppSelector(selectEditError);

  const accessToken = useAppSelector(selectAccessToken);

  const toast = useToast();

  useEffect(() => {
    if (isOpen && productEditSuccess) {
      closeWithClear();

      dispatch(clearProductEdit());

      toast({
        title: 'Товар отредактирован.',
        status: 'success',
        position: 'top-right',
      });
    }
  }, [dispatch, closeWithClear, isOpen, toast, productEditSuccess]);

  useEffect(() => {
    if (isOpen && productEditError) {
      toast({
        title: 'Что-то пошло не так.',
        status: 'error',
        position: 'top-right',
      });

      dispatch(clearProductEditError());
    }
  }, [dispatch, isOpen, toast, productEditError]);

  const onProductSave = () => {
    if (accessToken) {
      dispatch(
        patchProduct({
          product: {
            id,
            name: productName,
            description: productDescription,
            categoryId,
            uploadId: productUploadId,
            height,
            birthdate: new Date(birthdate || Date.now()).toISOString(),
            price,
          },
          accessToken,
        })
      );
    }
  };

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
            <Button
              onClick={pathname === '/products' ? onProductSave : () => {}}
              colorScheme="green"
              mr={3}
            >
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
