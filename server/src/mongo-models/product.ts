import { Schema, model } from 'mongoose';
import { Product } from '../../../common/interfaces/product.interface';

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  category: { type: Object, required: true } ,
  price: { type: Number, required: true },
  pieces: { type: Number, required: true },
  sizeCm: { type: Number, required: false },
  widthCm: { type: Number, required: false },
  heightCm: { type: Number, required: false },
  shape: { type: String, required: false },
  color: { type: String, required: false },
  maker: { type: String, required: false },
  type: { type: String, required: false },
  soldOut: { type: Boolean, required: true }
});

export const MongoProduct = model<Product>('Product', productSchema);
