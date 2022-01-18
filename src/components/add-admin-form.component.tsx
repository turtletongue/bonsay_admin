import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

export const AddAdminForm = () => {
  return (
    <VStack spacing={3}>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input name="email" placeholder="Email" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Пароль</FormLabel>
        <Input type="password" name="password" placeholder="Пароль" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="passwordConfirmation">
          Подтверждение пароля
        </FormLabel>
        <Input
          type="password"
          name="passwordConfirmation"
          placeholder="Подтверждение пароля"
        />
      </FormControl>
    </VStack>
  );
};

export default AddAdminForm;
