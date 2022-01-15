import { Icon } from '@chakra-ui/react';
import { FaClipboardList } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { BsFillBagCheckFill, BsPeopleFill } from 'react-icons/bs';

export const navlinks = [
  {
    icon: (isActive: boolean) => (
      <Icon
        as={FaClipboardList}
        w={6}
        h={6}
        color={isActive ? 'white' : '#EFEFEF'}
      />
    ),
    href: '/products',
    text: 'Товары',
  },
  {
    icon: (isActive: boolean) => (
      <Icon
        as={MdCategory}
        w={6}
        h={6}
        color={isActive ? 'white' : '#EFEFEF'}
      />
    ),
    href: '/categories',
    text: 'Категории',
  },
  {
    icon: (isActive: boolean) => (
      <Icon
        as={BsFillBagCheckFill}
        w={6}
        h={6}
        color={isActive ? 'white' : '#EFEFEF'}
      />
    ),
    href: '/orders',
    text: 'Заказы',
  },
  {
    icon: (isActive: boolean) => (
      <Icon
        as={BsPeopleFill}
        w={6}
        h={6}
        color={isActive ? 'white' : '#EFEFEF'}
      />
    ),
    href: '/clients',
    text: 'Клиенты',
  },
];
