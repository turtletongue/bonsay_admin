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
  productCreationData: Partial<Product>;
  productCreationLoading: 'idle' | 'pending';
  productCreationError?: string;
  productCreationSuccess: boolean;
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
