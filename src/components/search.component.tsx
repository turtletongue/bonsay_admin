import { ChangeEventHandler } from 'react';
import { Input, useMediaQuery } from '@chakra-ui/react';

interface SearchProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Search = ({ value, onChange }: SearchProps) => {
  const [isLessThan920] = useMediaQuery('(max-width: 920px)');

  return (
    <Input
      type="search"
      placeholder="Поиск"
      maxW="20rem"
      marginTop={isLessThan920 ? '1rem' : 0}
      marginLeft="1rem"
      value={value}
      onChange={onChange}
    />
  );
};

export default Search;
