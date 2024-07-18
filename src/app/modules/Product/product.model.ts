import  { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

interface IProduct extends TProduct, Document {}

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      reqsuired: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      //   ref: 'category',
      //   required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('product', productSchema);
