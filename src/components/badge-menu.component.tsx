import { Badge, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

type BadgeOption = {
  id: number;
  content: {
    color: string;
    text: string;
  };
  onClick?: (...args: unknown[]) => unknown;
};

interface BadgeSelectProps {
  badges: BadgeOption[];
  defaultBadge: BadgeOption;
}

export const BadgeMenu = ({ badges, defaultBadge }: BadgeSelectProps) => {
  return (
    <Menu matchWidth>
      <MenuButton
        as={Badge}
        onClick={defaultBadge.onClick}
        colorScheme={defaultBadge.content.color}
        cursor="pointer"
      >
        {defaultBadge.content.text}
      </MenuButton>
      <MenuList padding={0} minWidth={0} position="relative" left="-0.5rem">
        {badges.map((badge) => (
          <MenuItem key={badge.id} onClick={badge.onClick}>
            <Badge colorScheme={badge.content.color}>
              {badge.content.text}
            </Badge>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default BadgeMenu;
