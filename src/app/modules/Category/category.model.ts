import { model, Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  // product: [{ type: Schema.Types.ObjectId, ref: 'product' }]
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Category = model<TCategory>('category', categorySchema);
