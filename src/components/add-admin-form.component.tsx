import { ChangeEventHandler } from 'react';
import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectEmail,
  setEmail,
  selectPassword,
  setPassword,
  selectPasswordConfirmation,
  setPasswordConfirmation,
} from '../store/admins/admins.slice';

export const AddAdminForm = () => {
  const dispatch = useAppDispatch();

  const email = useAppSelector(selectEmail);
  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setEmail(event.target.value));
  };

  const password = useAppSelector(selectPassword);
  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setPassword(event.target.value));
  };

  const passwordConfirmation = useAppSelector(selectPasswordConfirmation);
  const onPasswordConfirmationChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(setPasswordConfirmation(event.target.value));
  };

  return (
    <VStack spacing={3}>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Пароль</FormLabel>
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={onPasswordChange}
          isInvalid={password !== passwordConfirmation}
          errorBorderColor="crimson"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="passwordConfirmation">
          Подтверждение пароля
        </FormLabel>
        <Input
          type="password"
          name="passwordConfirmation"
          placeholder="Подтверждение пароля"
          value={passwordConfirmation}
          onChange={onPasswordConfirmationChange}
          isInvalid={password !== passwordConfirmation}
          errorBorderColor="crimson"
        />
      </FormControl>
    </VStack>
  );
};

export default AddAdminForm;
