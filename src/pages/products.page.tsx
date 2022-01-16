import { useSearchParams, useLocation } from 'react-router-dom';
import { Box, Image, Icon, Button, Table, Tbody } from '@chakra-ui/react';
import { BsTrashFill, BsFillPencilFill } from 'react-icons/bs';

import TableHead from '../components/table-head.component';
import TableRow from '../components/table-row.component';
import Pagination from '../components/pagination.component';

import { Product } from '../declarations';

export const Products = () => {
  const [params] = useSearchParams();
  const { pathname } = useLocation();

  const products = [
    {
      id: 1,
      name: 'MONDAY PINE',
      price: 750,
      description: '',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
      age: 30,
      height: 34,
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
    },
    {
      id: 2,
      name: 'MONDAY PINE',
      price: 750,
      description: '',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
      age: 30,
      height: 34,
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
    },
    {
      id: 3,
      name: 'MONDAY PINE',
      price: 750,
      description: '',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
      age: 30,
      height: 34,
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
    },
    {
      id: 4,
      name: 'MONDAY PINE',
      price: 750,
      description: '',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
      age: 30,
      height: 34,
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
    },
    {
      id: 5,
      name: 'MONDAY PINE',
      price: 750,
      description: '',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
      age: 30,
      height: 34,
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
    },
    {
      id: 6,
      name: 'MONDAY PINE',
      price: 750,
      description: '',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
      age: 30,
      height: 34,
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
    },
    {
      id: 7,
      name: 'MONDAY PINE',
      price: 750,
      description: '',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
      age: 30,
      height: 34,
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
    },
    {
      id: 8,
      name: 'MONDAY PINE',
      price: 750,
      description: '',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
      age: 30,
      height: 34,
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
    },
  ];

  const getData = (product: Product) => {
    return [
      {
        id: 1,
        node: (
          <Image
            boxSize="5rem"
            objectFit="cover"
            src={product.upload?.path}
            alt={product.name}
          />
        ),
      },
      { id: 2, node: product.name },
      {
        id: 3,
        node: `${Number(product.price).toLocaleString()} ₽`,
      },
      {
        id: 4,
        node: (
          <>
            <Button>
              <Icon as={BsFillPencilFill} w={3} h={3} />
            </Button>
            <Button colorScheme="red" marginX="1rem">
              <Icon as={BsTrashFill} w={3} h={3} />
            </Button>
          </>
        ),
      },
    ];
  };

  return (
    <Box>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead titles={['Картинка', 'Название', 'Цена', 'Действия']} />
        <Tbody>
          {products.map((product) => {
            return <TableRow key={product.id} data={getData(product)} />;
          })}
        </Tbody>
      </Table>
      <Pagination
        pageNumber={Number(params.get('page')) || 1}
        url={pathname}
        total={products.length}
      />
    </Box>
  );
};

export default Products;
