import { useCallback } from 'react';

import { useToast } from '@chakra-ui/react';
import { storeTable, useAppDispatch, useAppSelector } from '.';
import { selectAccessToken } from '../core/core.slice';

import { Category, Product } from '../../declarations';

interface UseCreateOptions {
  sliceName: 'products' | 'categories';
  onSuccess?: () => void;
  onError?: () => void;
  canEffect?: boolean;
}

export const useCreate = ({
  sliceName,
  onSuccess = () => {},
  onError = () => {},
  canEffect = true,
}: UseCreateOptions) => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state[sliceName].writeData);
  const accessToken = useAppSelector(selectAccessToken);

  const slices = storeTable.slices;
  const createActions = storeTable.createActions;

  const slice = slices[sliceName] as typeof slices['categories'] &
    typeof slices['products'];

  const onSave = () => {
    dispatch(
      slice[createActions[sliceName]]({
        data: data as Partial<Category> & Partial<Product>,
        accessToken,
      })
    );
  };

  const toast = useToast();

  const success = useAppSelector((state) => state[sliceName].createSuccess);
  const successLabel = storeTable.labels[sliceName].successCreate;

  const successEffect = useCallback(() => {
    if (canEffect && success) {
      onSuccess();

      dispatch(slice.clearCreate());

      toast({
        title: successLabel,
        status: 'success',
        position: 'top-right',
      });
    }
  }, [dispatch, onSuccess, canEffect, successLabel, toast, success, slice]);

  const error = useAppSelector((state) => state[sliceName].createError);

  const errorEffect = useCallback(() => {
    if (canEffect && error) {
      onError();

      toast({
        title: 'Что-то пошло не так.',
        status: 'error',
        position: 'top-right',
      });

      dispatch(slice.clearCreateError());
    }
  }, [dispatch, onError, canEffect, toast, error, slice]);

  return Object.freeze([onSave, successEffect, errorEffect]);
};
