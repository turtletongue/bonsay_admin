import { Id, Product } from '../../declarations';

interface ProductsFilters {
  search: string;
}

export interface ProductsState {
  total: number;
  data: Product[];
  loading: 'idle' | 'pending';
  error?: string;
  filters: ProductsFilters;

  productData: Partial<Product>;

  productCreateLoading: 'idle' | 'pending';
  productCreateError?: string;
  productCreateSuccess: boolean;

  productDeleteLoading: 'idle' | 'pending';
  productDeleteError?: string;
  productDeleteSuccess: boolean;

  productEditLoading: 'idle' | 'pending';
  productEditError?: string;
  productEditSuccess: boolean;
}

export type FetchProductsParams = {
  page: number;
  filters: ProductsFilters;
};

export type CreateProductParams = {
  product: {
    name?: string;
    description?: string;
    price?: number;
    height?: number;
    birthdate?: string;
    categoryId?: Id;
    uploadId?: Id;
  };
  accessToken?: string;
};

export type DeleteProductParams = {
  productId: Id;
  accessToken: string;
};

export type PatchProductParams = {
  product: {
    id: Id;
    name?: string;
    description?: string;
    price?: number;
    height?: number;
    birthdate?: string;
    categoryId?: Id;
    uploadId?: Id;
  };
  accessToken: string;
};
