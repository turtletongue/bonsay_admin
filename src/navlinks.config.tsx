import { Icon } from '@chakra-ui/react';
import { FaClipboardList, FaShoppingCart } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { GoSignOut } from 'react-icons/go';

export const navlinks = [
  {
    icon: () => <Icon as={FaClipboardList} w={6} h={6} color="#EFEFEF" />,
    href: '/products',
    text: 'Товары',
  },
  {
    icon: () => <Icon as={MdCategory} w={6} h={6} color="#EFEFEF" />,
    href: '/categories',
    text: 'Категории',
  },
  {
    icon: () => <Icon as={FaShoppingCart} w={5} h={5} color="#EFEFEF" />,
    href: '/orders',
    text: 'Заказы',
  },
  {
    icon: () => <Icon as={IoMdSettings} w={6} h={6} color="#EFEFEF" />,
    href: '/admins',
    text: 'Администраторы',
  },
  {
    icon: () => <Icon as={GoSignOut} w={6} h={6} color="#EFEFEF" />,
    href: '/sign-out',
    text: 'Выход',
  },
];
