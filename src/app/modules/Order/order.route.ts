// order.route.ts
import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/api/orders', OrderController.createOrder);
router.get('/api/orders', OrderController.getAllOrders);
router.get('/api/orders/:orderId', OrderController.getOrderById);
router.delete('/api/orders/:orderId', OrderController.deleteOrder);

export const OrderRoutes = router;
