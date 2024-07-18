import mongoose from 'mongoose';

export type TCartItem = {
  productId:string;
  quantity: number;
};

export type TCart = {
  items: TCartItem[];
};
