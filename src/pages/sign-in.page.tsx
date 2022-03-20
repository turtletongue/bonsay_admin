import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import SignInForm from '@components/sign-in-form.component';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectIsAuthenticated, selectUser } from '@store/core/core.slice';
import { setError } from '@store/sign-in/sign-in.slice';
import { ONLY_ADMIN_ACCESS } from '@app/variables';

type LocationState = { from?: { pathname: string } };

export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const from = (location.state as LocationState)?.from?.pathname || '/';

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user && user?.role !== 'admin') {
      dispatch(setError(ONLY_ADMIN_ACCESS));
    } else {
      if (isAuthenticated) {
        navigate(from, { replace: true });
      }
    }
  }, [navigate, dispatch, from, user, isAuthenticated]);

  return (
    <Flex
      weight="full"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bgImage="url('/images/sign-in-bg.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <SignInForm />
    </Flex>
  );
};

export default SignIn;
