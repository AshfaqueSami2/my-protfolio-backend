import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/api/product', ProductControllers.createProduct);
router.get('/api/products', ProductControllers.getAllProducts);
router.get(
  '/api/product/:productId',
  ProductControllers.getSingleProductWithID,
);
router.put('/api/product/:productId', ProductControllers.updateProduct);
router.delete('/api/product/:id', ProductControllers.deleteProduct);

export const ProductRoutes = router;
