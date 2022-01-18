import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import Dropzone from './dropzone.component';

export const AddCategoryForm = () => {
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
        <FormLabel htmlFor="photo">Картинка</FormLabel>
        <Dropzone onFileAccepted={() => {}} />
      </FormControl>
    </VStack>
  );
};

export default AddCategoryForm;
