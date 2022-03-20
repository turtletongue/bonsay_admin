import { ChangeEventHandler, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  clear,
  login,
  selectEmail,
  selectError,
  selectIsLoading,
  selectPassword,
  setEmail,
  setPassword,
} from '@store/sign-in/sign-in.slice';
import { selectIsAuthenticated } from '@store/core/core.slice';

export const SignInForm = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(clear());
    }
  }, [dispatch, isAuthenticated]);

  const email = useAppSelector(selectEmail);
  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setEmail(event.target.value));
  };

  const password = useAppSelector(selectPassword);
  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setPassword(event.target.value));
  };

  const onSignIn = () => {
    dispatch(login({ email, password }));
  };

  const isLoading = useAppSelector(selectIsLoading);

  const error = useAppSelector(selectError);

  return (
    <VStack
      spacing={4}
      p="2rem"
      rounded="md"
      boxShadow="base"
      w="20rem"
      bgColor="white"
    >
      <Box color="crimson" h="1rem" textAlign="center">
        {error}
      </Box>

      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
          placeholder="Email"
          backgroundColor="white"
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
          backgroundColor="white"
          value={password}
          onChange={onPasswordChange}
        />
      </FormControl>

      <Button
        isLoading={isLoading}
        loadingText="Загрузка"
        colorScheme="teal"
        w="full"
        onClick={onSignIn}
      >
        Войти
      </Button>
    </VStack>
  );
};

export default SignInForm;
