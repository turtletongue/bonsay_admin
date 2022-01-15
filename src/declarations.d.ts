import { ReactNode } from 'react';

export interface NavlinkData {
  icon: (isActive: boolean) => ReactNode;
  text: string;
  href: string;
}
