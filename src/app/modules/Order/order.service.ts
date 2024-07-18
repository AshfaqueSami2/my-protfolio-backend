// order.service.ts
import { Order } from './order.model';
import { Product } from '../Product/product.model';
import { TOrder } from './order.interface';

const createOrder = async (orderData: TOrder) => {
  const { products } = orderData;

  // Check stock availability for each product
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error(`Product not found: ${item.productId}`);
    if (product.stock < item.quantity)
      throw new Error(`Not enough stock for product: ${product.title}`);
  }
  

  // Create the order
  const newOrder = new Order(orderData);
  const result = await newOrder.save();

  // Update the stock
  for (const item of products) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity },
    });
  }

  return result;
};

const getOrderById = async (orderId: string) => {
  const order = await Order.findById(orderId).populate('products.productId');
  if (!order) throw new Error('Order not found');
  return order;
};

const getAllOrders = async () => {
  const result = await Order.find().populate('products.productId').exec();
  return result;
};

const deleteOrder = async (orderId:any) => {
  const result = await Order.findByIdAndUpdate(
    orderId,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new Error('Order not found');
  }
  return result;
};

export const OrderService = {
  createOrder,
  getOrderById,
  getAllOrders,
  deleteOrder,
};
