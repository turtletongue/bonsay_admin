import { ReactNode } from 'react';

export type Id = string | number;

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
  birthdate?: string;
  height: number;
  price: number;
  categoryId?: Id;
  uploadId?: Id;

  path?: string;
  upload?: Upload;

  photosUploadsIds?: Id[];
  photos?: Upload[];

  similarProducts?: Product[];

  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: Id;
  name: string;
  description: string;

  path?: string;
  upload?: Upload;
  uploadId?: Id;

  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: Id;
  email: string;
  role?: 'client' | 'admin';
  password?: string;
  passwordConfirmation?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface Client {
  id: Id;
  user: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  id: Id;
  city: string;
  street: string;
  house: string;
  postcode: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Purchase {
  id: Id;
  product: Product;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  id: Id;
  sum: number;
  createdAt?: string;
  updatedAt?: string;
}

export type OrderStatus = 'processing' | 'delivery' | 'completed' | 'cancelled';

export interface Order {
  id: Id;
  status: OrderStatus;
  firstname: string;
  lastname: string;
  phone: string;
  address: Address;
  client: Client;
  purchases: Purchase[];
  payments: Payment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Upload {
  id: Id;
  path: string;
}

export interface Photo {
  id: Id;
  uploadId: Id;
  productId: Id;
}

export type SliceName = 'products' | 'categories';
