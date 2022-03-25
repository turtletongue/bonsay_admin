import { ReactNode } from 'react';

import PaginationButton from '@components/pagination-button.component';
import { errorMessages } from '@app/variables';

export const getPageNumberButtons = (
  pagesCount: number,
  setPage: (page: number) => unknown,
  activePageNumber?: number
) => {
  const buttons: ReactNode[] = [];

  for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
    buttons.push(
      <PaginationButton
        key={pageNumber}
        pageNumber={pageNumber}
        isActive={pageNumber === activePageNumber}
        setPage={setPage}
      />
    );
  }

  return buttons;
};

export const fetchWithErrorHandling = async (
  fetcher: () => Promise<unknown>,
  rejectWithValue: (value: unknown) => unknown
): Promise<unknown> => {
  try {
    return await fetcher();
  } catch (error: any) {
    const originalMessage = error.response?.data
      ?.message as keyof typeof errorMessages;

    return rejectWithValue(
      errorMessages[
        Array.isArray(originalMessage)
          ? (originalMessage as (keyof typeof errorMessages)[])[0]
          : originalMessage
      ] || originalMessage
    );
  }
};

export const getOrderNumber = (id: string | number) =>
  String(id).padStart(6, '0');
