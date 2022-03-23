import { Schema, model } from 'mongoose';
import { Product } from '../../../common/interfaces/product.interface';

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  category: { type: Object, required: true } ,
  price: { type: Number, required: true },
  pieces: { type: Number, required: true },
  sizeCm: { type: Number, required: true },
  widthCm: { type: Number, required: true },
  heightCm: { type: Number, required: true },
  shape: { type: String, required: true },
  color: { type: String, required: true },
  maker: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true }
});

export const MongoProduct = model<Product>('Product', productSchema);
