// cart.route.ts
import express from 'express';
import { CartController } from './cart.controller';

const router = express.Router();

router.post('/api/cart', CartController.addToCart);
router.get('/api/cart', CartController.getCart);
router.put('/api/cart/:productId', CartController.editCartItem);
router.delete('/api/cart/:productId', CartController.removeFromCart);

export const CartRoutes = router;
