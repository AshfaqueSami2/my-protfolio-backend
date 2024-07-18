import { TProduct } from '../Product/product.interface';

export type TCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  // product: TProduct[];
  isDeleted: boolean;
};
