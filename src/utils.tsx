import { ReactNode } from 'react';

import PaginationButton from './components/pagination-button.component';
import { errorMessages } from './variables';

export const getPageNumberButtons = (
  pagesCount: number,
  activePageNumber?: number,
  url?: string
) => {
  const buttons: ReactNode[] = [];

  for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
    buttons.push(
      <PaginationButton
        key={pageNumber}
        pageNumber={pageNumber}
        url={url}
        isActive={pageNumber === activePageNumber}
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
