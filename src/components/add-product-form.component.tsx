import { ChangeEventHandler, useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  InputGroup,
  InputRightAddon,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';

import Dropzone from '@components/dropzone.component';
import ImagePreview from '@components/image-preview.component';
import {
  selectBirthdate,
  selectCategoryId,
  selectDescription,
  selectHeight,
  selectName,
  selectPrice,
  selectUploadId,
  setBirthdate,
  setCategoryId,
  setDescription,
  setHeight,
  setName,
  setPrice,
  setUploadId,
} from '@store/products/products.slice';
import {
  fetchCategories,
  selectCategories,
} from '@store/categories/categories.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectAccessToken } from '@store/core/core.slice';
import { api } from '@app/api';

export const AddProductForm = () => {
  const [uploadPath, setUploadPath] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const name = useAppSelector(selectName);
  const onNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setName(event.target.value));
  };

  const description = useAppSelector(selectDescription);
  const onDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    dispatch(setDescription(event.target.value));
  };

  const price = useAppSelector(selectPrice);
  const onPriceChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setPrice(+event.target.value));
  };

  const height = useAppSelector(selectHeight);
  const onHeightChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setHeight(+event.target.value));
  };

  const birthdate = useAppSelector(selectBirthdate);
  const onBirthdateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setBirthdate(event.target.value));
  };

  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryId = useAppSelector(selectCategoryId);
  const onCategoryIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch(setCategoryId(event.target.value));
  };

  useEffect(() => {
    if (categories.length > 0 && categoryId === -1) {
      dispatch(setCategoryId(categories[0].id || -1));
    }
  }, [dispatch, categoryId, categories]);

  const accessToken = useAppSelector(selectAccessToken);

  const uploadId = useAppSelector(selectUploadId);
  const onFileAccepted = async (file: File) => {
    const formData = new FormData();

    formData.append('file', file);

    try {
      const upload = await axios.post(api.uploads, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(setUploadId(upload.data.id));
    } catch {
      // error handling
    }
  };
  const onUploadRemove = () => {
    dispatch(setUploadId(-1));
  };

  useEffect(() => {
    if (uploadId !== -1) {
      (async () => {
        try {
          const upload = await axios.get(api.uploads + `/${uploadId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setUploadPath(upload.data.path);
        } catch {
          // error handling
        }
      })();
    } else {
      setUploadPath(null);
    }
  }, [setUploadPath, accessToken, uploadId]);

  return (
    <VStack spacing={3}>
      <FormControl>
        <FormLabel htmlFor="name">Название</FormLabel>
        <Input
          name="name"
          placeholder="Название"
          value={name}
          onChange={onNameChange}
          isInvalid={!String(name).trim()}
          errorBorderColor="crimson"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="description">Описание</FormLabel>
        <Textarea
          name="description"
          placeholder="Описание"
          value={description}
          onChange={onDescriptionChange}
          isInvalid={!String(description).trim()}
          errorBorderColor="crimson"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="price">Цена</FormLabel>
        <InputGroup size="sm">
          <Input
            type="number"
            name="price"
            step={0.01}
            placeholder="0"
            value={price}
            onChange={onPriceChange}
          />
          <InputRightAddon>₽</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="height">Высота</FormLabel>
        <InputGroup size="sm">
          <Input
            type="number"
            name="height"
            placeholder="0"
            value={height}
            onChange={onHeightChange}
            min={0}
          />
          <InputRightAddon>см</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="birthdate">Дата рождения</FormLabel>
        <Input
          type="date"
          name="birthdate"
          value={String(birthdate)}
          onChange={onBirthdateChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="category">Категория</FormLabel>
        <Select
          name="category"
          value={categoryId}
          onChange={onCategoryIdChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <Box w="full">
        <FormLabel htmlFor="photo">Картинка</FormLabel>
        {uploadId && uploadPath ? (
          <ImagePreview uploadPath={uploadPath} onClick={onUploadRemove} />
        ) : (
          <Dropzone onFileAccepted={onFileAccepted} />
        )}
      </Box>
    </VStack>
  );
};

export default AddProductForm;
