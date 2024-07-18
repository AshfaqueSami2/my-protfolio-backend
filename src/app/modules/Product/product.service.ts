import QueryBuilder from '../../builder/QueryBuilder';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import { ProductSearchableFields } from './product.constant';

const createProductIntoDB = async (productData: TProduct) => {
  const newProduct = new Product(productData);
  const result = await newProduct.save();
  return result;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery.exec()
  return result;
  // const result = await Product.find().exec();
  // return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findById(_id);
  return result;
};

const updateProductInformationInDB = async (
  _id: string,
  updateData: Partial<TProduct>,
) => {
  const result = await Product.findByIdAndUpdate(_id, updateData, {
    new: true,
  });
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

// const deleteProductFromDB = async (id: string): Promise<TProduct | null> => {
//   const result = await Product.findByIdAndUpdate(
//     id,
//     { isDeleted: true },
//     { new: true },
//   );
//   if (!result) {
//     throw new Error('Product not found');
//   }
//   return result;
// };

const deleteProductFromDB = async (id: string): Promise<TProduct | null> => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};


export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductInformationInDB,
  deleteProductFromDB,
};
