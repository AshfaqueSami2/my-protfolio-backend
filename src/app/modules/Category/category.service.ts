import { Product } from '../Product/product.model';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import { Request, Response } from 'express';

const createCategoryIntoDB = async (categoryData: TCategory) => {
  const newProduct = new Category(categoryData);
  const result = await newProduct.save();
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find().exec();
  return result;
};

const getSignleCategoryFromDB = async (
  categoryId: string,
): Promise<TCategory | null> => {
  const result = await Category.findById(categoryId);
  if (!result) {
    throw new Error('Category not found');
  }
  return result;
};

const updateCategoryInformationInDB = async (
  _id: string,
  updateData: Partial<TCategory>,
) => {
  const result = await Category.findByIdAndUpdate(_id, updateData, {
    new: true,
  });
  if (!result) {
    throw new Error('Category not found');
  }
  return result;
};

const deleteCategoryFromDB = async (id: string): Promise<TCategory | null> => {
  const result = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new Error('Category not found');
  }
  return result;
};

//i just do here CategoryPagination when i have a product in my Category that
// why i do also query in here
const categoryPagination = async (req:Request, res:Response) => {
  const { categoryName } = req.params;
  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || page < 1) {
    return res.status(400).json({ error: 'Invalid page number' });
  }
  if (isNaN(limit) || limit < 1) {
    return res.status(400).json({ error: 'Invalid limit number' });
  }

  const query = { category: categoryName };

  try {
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalProducts = await Product.countDocuments(query);

    res.json({ data: products, total: totalProducts, page, limit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSignleCategoryFromDB,
  updateCategoryInformationInDB,
  deleteCategoryFromDB,
  categoryPagination,
};
