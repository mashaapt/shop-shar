import { Schema, model } from 'mongoose';
import { Product } from '../../../common/interfaces/product.interface';

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  category: { type: Object, required: true } ,
  price: { type: String, required: true },
  pieces: { type: String, required: false },
  sizeCm: { type: String, required: false },
  widthCm: { type: String, required: false },
  heightCm: { type: String, required: false },
  shape: { type: String, required: false },
  color: { type: String, required: false },
  maker: { type: String, required: false },
  type: { type: String, required: false },
  soldOut: { type: Boolean, required: true },
  imagePath: { type: String, required: false}
});

export const MongoProduct = model<Product>('Product', productSchema);
