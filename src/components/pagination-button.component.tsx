import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

interface PaginationButtonProps {
  pageNumber: number;
  isActive?: boolean;
  url?: string;
}

export const PaginationButton = ({
  pageNumber,
  isActive = false,
  url = '/',
}: PaginationButtonProps) => {
  return (
    <Link to={`${url}?page=${pageNumber}`}>
      <Button
        color={isActive ? '#254125' : '#627A52'}
        backgroundColor={isActive ? 'green.100' : ''}
        cursor={isActive ? 'default' : 'pointer'}
        _hover={{ backgroundColor: isActive ? 'green.100' : '#D1D5DB' }}
        _focus={{ backgroundColor: isActive ? 'green.100' : '#D1D5DB' }}
        _active={{ backgroundColor: isActive ? 'green.100' : '#D1D5DB' }}
      >
        {pageNumber}
      </Button>
    </Link>
  );
};

export default PaginationButton;
