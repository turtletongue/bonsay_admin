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

export interface Client {
  id: Id;
  user: {
    email: string;
  };
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Address {
  id: Id;
  city: string;
  street: string;
  house: string;
  postcode: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Purchase {
  id: Id;
  qty: number;
  product: Product;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Payment {
  id: Id;
  sum: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Order {
  id: Id;
  phone: string;
  address: Address;
  client: Client;
  purchases: Purchase[];
  payments: Payment[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
