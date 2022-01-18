import { useSearchParams, useLocation } from 'react-router-dom';
import { Box, Image, Icon, Button, Table, Tbody } from '@chakra-ui/react';
import { BsFillPencilFill } from 'react-icons/bs';

import TableHead from '../components/table-head.component';
import TableRow from '../components/table-row.component';
import Pagination from '../components/pagination.component';

import { Category } from '../declarations';
import DeleteConfirmationModal from '../components/delete-confirmation-modal.component';

export const Categories = () => {
  const [params] = useSearchParams();
  const { pathname } = useLocation();

  const categories = [
    {
      id: 1,
      name: 'Фикусы',
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
      description:
        'Фикус – это разновидность растений, произрастающих в тропиках по всему миру. Он невероятно разнообразен, некоторые виды используются в качестве домашних растений. Фикус может быть кустарником, лозой или просто небольшим декоративным растением. Многие подвиды производят воздушные корни, другие дают вкусные плоды, к примеру, инжир. Священный инжир имеет особое значение для последователей некоторых азиатских религий, включая буддизм.',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
    },
    {
      id: 2,
      name: 'Сосны',
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
      description:
        'Сосна - это вечнозеленое хвойное дерево, кустарник или стланик, относится к классу хвойные, порядку сосновые, семейству сосновые, роду сосны. Продолжительность жизни сосны колеблется от 100 до 600 лет. Сегодня встречаются единичные деревья, возраст которых приближается к 5 векам. Сосна – это светолюбивое растение. Время цветения наступает в конце весны, но процесс происходит без появления цветков. В итоге образуются сосновые шишки, которые отличаются многообразием форм, размеров и цветов.',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
    },
    {
      id: 3,
      name: 'Сосны',
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
      description:
        'Сосна - это вечнозеленое хвойное дерево, кустарник или стланик, относится к классу хвойные, порядку сосновые, семейству сосновые, роду сосны. Продолжительность жизни сосны колеблется от 100 до 600 лет. Сегодня встречаются единичные деревья, возраст которых приближается к 5 векам. Сосна – это светолюбивое растение. Время цветения наступает в конце весны, но процесс происходит без появления цветков. В итоге образуются сосновые шишки, которые отличаются многообразием форм, размеров и цветов.',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
    },
    {
      id: 4,
      name: 'Сосны',
      upload: {
        path: 'https://images.unsplash.com/photo-1642252797294-c8a97b9d66cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
      },
      description:
        'Сосна - это вечнозеленое хвойное дерево, кустарник или стланик, относится к классу хвойные, порядку сосновые, семейству сосновые, роду сосны. Продолжительность жизни сосны колеблется от 100 до 600 лет. Сегодня встречаются единичные деревья, возраст которых приближается к 5 векам. Сосна – это светолюбивое растение. Время цветения наступает в конце весны, но процесс происходит без появления цветков. В итоге образуются сосновые шишки, которые отличаются многообразием форм, размеров и цветов.',
      createdAt: '2020-12-20',
      updatedAt: '2020-12-20',
    },
  ];

  const getData = (category: Category) => {
    return [
      {
        id: 1,
        node: (
          <Image
            boxSize="5rem"
            objectFit="cover"
            src={category.upload?.path}
            alt={category.name}
          />
        ),
        title: 'Картинка',
      },
      { id: 2, node: category.name, title: 'Название' },
      {
        id: 3,
        node: (
          <>
            <Button marginTop="1rem">
              <Icon as={BsFillPencilFill} w={3} h={3} />
            </Button>
            <DeleteConfirmationModal />
          </>
        ),
        title: 'Действия',
      },
    ];
  };

  return (
    <Box>
      <Table variant="simple" maxH="80vh" overflow="hidden">
        <TableHead titles={['Картинка', 'Название', 'Действия']} />
        <Tbody>
          {categories.map((category) => {
            return <TableRow key={category.id} data={getData(category)} />;
          })}
        </Tbody>
      </Table>
      <Pagination
        pageNumber={Number(params.get('page')) || 1}
        url={pathname}
        total={categories.length}
      />
    </Box>
  );
};

export default Categories;
