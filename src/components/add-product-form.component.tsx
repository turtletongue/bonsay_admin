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
  useToast,
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
  selectPhotosUploadsIds,
  setBirthdate,
  setCategoryId,
  setDescription,
  setHeight,
  setName,
  setPrice,
  setUploadId,
  setPhotosUploadsIds,
} from '@store/products/products.slice';
import {
  fetchCategories,
  selectCategories,
} from '@store/categories/categories.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectAccessToken } from '@store/core/core.slice';
import { api } from '@app/api';

import { Id, Upload } from '@app/declarations';

export const AddProductForm = () => {
  const toast = useToast();

  const [uploadPath, setUploadPath] = useState<string | null>(null);
  const [photosPaths, setPhotosPaths] = useState<{ id: Id; path: string }[]>(
    []
  );

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
  const photosUploadsIds = useAppSelector(selectPhotosUploadsIds);

  const onFileAccepted = async (file: File, mode: 'upload' | 'photo') => {
    const formData = new FormData();

    formData.append('file', file);

    try {
      const upload = await axios.post(api.uploads, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (mode === 'upload') {
        dispatch(setUploadId(upload.data.id));
      } else {
        dispatch(setPhotosUploadsIds([...photosUploadsIds, upload.data.id]));
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Что-то пошло не так при загрузке изображения',
        status: 'error',
        position: 'bottom-right',
      });
    }
  };

  const onUploadRemove = () => {
    dispatch(setUploadId(-1));
  };

  const onPhotoRemove = (uploadId: Id) => {
    dispatch(
      setPhotosUploadsIds(
        photosUploadsIds.filter((photoUploadId) => photoUploadId !== uploadId)
      )
    );
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
          toast({
            title: 'Что-то пошло не так при загрузке изображения',
            status: 'error',
            position: 'bottom-right',
          });
        }
      })();
    } else {
      setUploadPath(null);
    }
  }, [setUploadPath, accessToken, uploadId, toast]);

  useEffect(() => {
    if (photosUploadsIds.length !== 0) {
      (async () => {
        try {
          const uploads = await axios.get(api.uploads, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              id: {
                $in: photosUploadsIds,
              },
            },
          });

          setPhotosPaths(
            uploads.data.data.map((upload: Upload) => ({
              id: upload.id,
              path: upload.path,
            }))
          );
        } catch (error) {
          console.log(error);

          toast({
            title: 'Что-то пошло не так при загрузке изображения',
            status: 'error',
            position: 'bottom-right',
          });
        }
      })();
    } else {
      setPhotosPaths([]);
    }
  }, [setPhotosPaths, accessToken, photosUploadsIds, toast]);

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
          <ImagePreview
            id={uploadId}
            uploadPath={uploadPath}
            onClick={onUploadRemove}
          />
        ) : (
          <Dropzone onFileAccepted={(file) => onFileAccepted(file, 'upload')} />
        )}
      </Box>

      <Box w="full">
        <FormLabel htmlFor="photo">Дополнительные фотографии</FormLabel>
        {photosPaths.map((photoPath) => (
          <Box key={photoPath.id} margin="1rem">
            <ImagePreview
              id={photoPath.id}
              uploadPath={photoPath.path}
              onClick={onPhotoRemove}
            />
          </Box>
        ))}
        {photosPaths.length < 3 && (
          <Dropzone onFileAccepted={(file) => onFileAccepted(file, 'photo')} />
        )}
      </Box>
    </VStack>
  );
};

export default AddProductForm;
