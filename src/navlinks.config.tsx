import { Icon } from '@chakra-ui/react';
import { FaClipboardList } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { GoSignOut } from 'react-icons/go';

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
        as={IoMdSettings}
        w={6}
        h={6}
        color={isActive ? 'white' : '#EFEFEF'}
      />
    ),
    href: '/admins',
    text: 'Администраторы',
  },
  {
    icon: () => <Icon as={GoSignOut} w={6} h={6} color="#EFEFEF" />,
    href: '/sign-out',
    text: 'Выход',
  },
];
