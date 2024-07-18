import { Schema, model } from 'mongoose';
import { TCart, TCartItem } from './cart.interface';

const cartItemSchema = new Schema<TCartItem>({
  productId: {
    type:String
  },
  quantity: { type: Number, required: true }
});

const cartSchema = new Schema<TCart>({
  items: [cartItemSchema]
});

export const Cart = model<TCart>('cart', cartSchema);