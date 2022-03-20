import { Button, HStack, Icon } from '@chakra-ui/react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import { getPageNumberButtons } from '@app/utils';
import { DEFAULT_FETCH_LIMIT } from '@app/variables';

interface PaginationProps {
  pageNumber: number;
  total: number;
  limit?: number;
  setPage: (page: number) => unknown;
}

export const Pagination = ({
  pageNumber,
  total,
  setPage,
  limit = DEFAULT_FETCH_LIMIT,
}: PaginationProps) => {
  const pagesCount = Math.ceil(total / limit);

  return (
    <>
      {pagesCount > 1 && (
        <HStack marginLeft="1rem" marginTop="0.5rem">
          {pageNumber > 1 && (
            <div onClick={() => setPage(pageNumber - 1)}>
              <Button>
                <Icon as={AiOutlineArrowLeft} w={5} h={5} color="#627A52" />
              </Button>
            </div>
          )}
          {getPageNumberButtons(pagesCount, setPage, pageNumber)}
          {pageNumber < pagesCount && (
            <div onClick={() => setPage(pageNumber + 1)}>
              <Button>
                <Icon as={AiOutlineArrowRight} w={5} h={5} color="#627A52" />
              </Button>
            </div>
          )}
        </HStack>
      )}
    </>
  );
};

export default Pagination;
