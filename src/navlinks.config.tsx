import { Icon } from '@chakra-ui/react';
import { FaClipboardList } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { BsFillBagCheckFill, BsPeopleFill } from 'react-icons/bs';

export const navlinks = [
  {
    icon: <Icon as={FaClipboardList} w={6} h={6} color="#EFEFEF" />,
    href: '/products',
    text: 'Товары',
  },
  {
    icon: <Icon as={MdCategory} w={6} h={6} color="#EFEFEF" />,
    href: '/categories',
    text: 'Категории',
  },
  {
    icon: <Icon as={BsFillBagCheckFill} w={6} h={6} color="#EFEFEF" />,
    href: '/orders',
    text: 'Заказы',
  },
  {
    icon: <Icon as={BsPeopleFill} w={6} h={6} color="#EFEFEF" />,
    href: '/clients',
    text: 'Клиенты',
  },
];
