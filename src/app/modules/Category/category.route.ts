import express from 'express';
import { CategoryControllers } from './category.controller';
import { Product } from '../Product/product.model';
import { CategoryServices } from './category.service';

const router = express.Router();

router.post('/api/category', CategoryControllers.createCategory);
router.get('/api/category', CategoryControllers.getAllCategory);
router.get('/api/category/:id', CategoryControllers.getSingleCategoryFromDB);
router.put('/api/category/:categoryId', CategoryControllers.updateCategory);
router.delete('/api/category/:id', CategoryControllers.deleteCategory);

router.get(
  '/api/products/category/:categoryName',
  CategoryServices.categoryPagination,
);

export const CategoryRoutes = router;
