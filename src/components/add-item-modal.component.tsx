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
  useToast,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  clearProductCreate,
  createProduct,
  selectBirthdate,
  selectCategoryId,
  selectDescription,
  selectCreateError,
  selectHeight,
  selectName,
  selectPrice,
  selectCreateSuccess,
  selectUploadId,
  clearProductCreateError,
  clearProductData,
} from '../store/products/products.slice';
import { selectAccessToken } from '../store/core/core.slice';

interface AddItemModalProps {
  children?: ReactNode;
}

export const AddItemModal = ({ children }: AddItemModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const closeWithClear = useCallback(() => {
    onClose();

    dispatch(clearProductData());
  }, [dispatch, onClose]);

  const toast = useToast();

  const accessToken = useAppSelector(selectAccessToken);

  const productName = useAppSelector(selectName);
  const productDescription = useAppSelector(selectDescription);
  const categoryId = useAppSelector(selectCategoryId);
  const productUploadId = useAppSelector(selectUploadId);
  const price = useAppSelector(selectPrice);
  const height = useAppSelector(selectHeight);
  const birthdate = useAppSelector(selectBirthdate);
  const productCreateSuccess = useAppSelector(selectCreateSuccess);
  const productCreateError = useAppSelector(selectCreateError);

  const onProductSave = () => {
    dispatch(
      createProduct({
        product: {
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
  };

  useEffect(() => {
    if (productCreateSuccess) {
      closeWithClear();

      dispatch(clearProductCreate());

      toast({
        title: 'Товар создан.',
        status: 'success',
        position: 'top-right',
      });
    }
  }, [dispatch, closeWithClear, toast, productCreateSuccess]);

  useEffect(() => {
    if (productCreateError) {
      toast({
        title: 'Что-то пошло не так.',
        status: 'error',
        position: 'top-right',
      });

      dispatch(clearProductCreateError());
    }
  }, [dispatch, toast, productCreateError]);

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
            <Routes>
              <Route
                path="products"
                element={
                  <Button onClick={onProductSave} colorScheme="green" mr={3}>
                    Сохранить
                  </Button>
                }
              />
            </Routes>
            <Button onClick={closeWithClear}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddItemModal;
