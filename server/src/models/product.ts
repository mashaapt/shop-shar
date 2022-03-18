import { Schema, model } from 'mongoose';

export type ProductType = 'balloon' | 'wallpaper';

export interface Product {
  type: ProductType;  
}

const productSchema = new Schema<Product>({
  // title: { type: String, required: true },
  // author: { type: String, required: true },
  // genre: { type: String, required: true },
  // read: { type: Boolean, required: true }
});

export const ProductModel = model<Product>('Product', productSchema);

