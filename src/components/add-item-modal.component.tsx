import { ReactNode, useEffect } from 'react';
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
  clearProductCreation,
  createProduct,
  selectBirthdate,
  selectCategoryId,
  selectDescription,
  selectError,
  selectHeight,
  selectName,
  selectPrice,
  selectSuccess,
  selectUploadId,
  clearProductCreationError,
} from '../store/products/products.slice';
import { selectAccessToken } from '../store/core/core.slice';

interface AddItemModalProps {
  children?: ReactNode;
}

export const AddItemModal = ({ children }: AddItemModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const dispatch = useAppDispatch();

  const accessToken = useAppSelector(selectAccessToken);

  const productName = useAppSelector(selectName);
  const productDescription = useAppSelector(selectDescription);
  const categoryId = useAppSelector(selectCategoryId);
  const productUploadId = useAppSelector(selectUploadId);
  const price = useAppSelector(selectPrice);
  const height = useAppSelector(selectHeight);
  const birthdate = useAppSelector(selectBirthdate);
  const productCreationSuccess = useAppSelector(selectSuccess);
  const productCreationError = useAppSelector(selectError);

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
    if (productCreationSuccess) {
      onClose();

      dispatch(clearProductCreation());

      toast({
        title: 'Товар создан.',
        status: 'success',
        position: 'top-right',
      });
    }
  }, [dispatch, onClose, toast, productCreationSuccess]);

  useEffect(() => {
    if (productCreationError) {
      toast({
        title: 'Что-то пошло не так.',
        status: 'error',
        position: 'top-right',
      });

      dispatch(clearProductCreationError());
    }
  }, [dispatch, toast, productCreationError]);

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        <Icon as={AiOutlinePlus} w={6} h={6} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
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
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddItemModal;
