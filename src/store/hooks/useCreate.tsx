import { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

import { storeTable, useAppDispatch, useAppSelector } from '@store/hooks';
import { selectAccessToken } from '@store/core/core.slice';
import { errorMessages } from '@app/variables';

interface UseCreateOptions {
  sliceName: 'products' | 'admins' | 'categories';
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
    typeof slices['products'] &
    typeof slices['admins'];

  const onSave = () => {
    dispatch(
      (slice[createActions[sliceName]] as Function)({
        data,
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
        position: 'bottom-right',
      });
    }
  }, [dispatch, onSuccess, canEffect, successLabel, toast, success, slice]);

  const error = useAppSelector((state) => state[sliceName].createError);

  const errorEffect = useCallback(() => {
    if (canEffect && error) {
      onError();

      toast({
        title: Object.values(errorMessages).includes(error)
          ? error
          : 'Что-то пошло не так',
        status: 'error',
        position: 'bottom-right',
      });

      dispatch(slice.clearCreateError());
    }
  }, [dispatch, onError, canEffect, toast, error, slice]);

  return Object.freeze([onSave, successEffect, errorEffect]);
};
