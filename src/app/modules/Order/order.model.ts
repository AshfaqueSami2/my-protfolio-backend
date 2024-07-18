// order.model.ts
import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderItemSchema = new Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    phone: { type: String, required: true },
    products: [orderItemSchema],
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', orderSchema);
