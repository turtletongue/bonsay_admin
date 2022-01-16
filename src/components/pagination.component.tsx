import { Link } from 'react-router-dom';
import { Button, HStack, Icon } from '@chakra-ui/react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import { DEFAULT_FETCH_LIMIT } from '../variables';
import { getPageNumberButtons } from '../utils';

interface PaginationProps {
  pageNumber: number;
  url?: string;
  total: number;
  limit?: number;
}

export const Pagination = ({
  pageNumber,
  url = '/',
  total,
  limit = DEFAULT_FETCH_LIMIT,
}: PaginationProps) => {
  const pagesCount = Math.ceil(total / limit);

  return (
    <>
      {pagesCount > 1 && (
        <HStack marginLeft="1rem" marginTop="0.5rem">
          {pageNumber > 1 && (
            <Link to={`${url}?page=${pageNumber - 1}`}>
              <Button>
                <Icon as={AiOutlineArrowLeft} w={5} h={5} color="#627A52" />
              </Button>
            </Link>
          )}
          {getPageNumberButtons(pagesCount, pageNumber, url)}
          {pageNumber < pagesCount && (
            <Link to={`${url}?page=${pageNumber + 1}`}>
              <Button>
                <Icon as={AiOutlineArrowRight} w={5} h={5} color="#627A52" />
              </Button>
            </Link>
          )}
        </HStack>
      )}
    </>
  );
};

export default Pagination;
