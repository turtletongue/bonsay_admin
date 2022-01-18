import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';

import Dropzone from './dropzone.component';

export const AddProductForm = () => {
  return (
    <VStack spacing={3}>
      <FormControl>
        <FormLabel htmlFor="name">Название</FormLabel>
        <Input name="name" placeholder="Название" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="description">Описание</FormLabel>
        <Textarea name="description" placeholder="Описание" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="price">Цена</FormLabel>
        <InputGroup size="sm">
          <Input type="number" name="price" step={0.01} placeholder="0" />
          <InputRightAddon>₽</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="category">Категория</FormLabel>
        <Select name="category">
          <option value="1">Фикусы</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="photo">Картинка</FormLabel>
        <Dropzone onFileAccepted={() => {}} />
      </FormControl>
    </VStack>
  );
};

export default AddProductForm;
