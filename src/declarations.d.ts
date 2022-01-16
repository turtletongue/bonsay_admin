import { ReactNode } from 'react';

export interface NavlinkData {
  icon: (isActive: boolean) => ReactNode;
  text: string;
  href: string;
}

export interface Product {
  id: Id;
  name: string;
  description: string;
  age?: number;
  birthdate?: Date | string;
  height: number;
  price: number;
  categoryId?: Id;

  path?: string;
  upload?: Upload;

  photos?: Upload[];

  similarProducts?: Product[];

  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Category {
  id: Id;
  name: string;
  description: string;

  path?: string;
  upload?: Upload;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
