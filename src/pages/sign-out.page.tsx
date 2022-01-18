import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { selectIsAuthenticated, signOut } from '../store/core/core.slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const SignOut = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(signOut());
    }
  }, [dispatch, isAuthenticated]);

  return <Navigate to="/sign-in" replace />;
};

export default SignOut;
