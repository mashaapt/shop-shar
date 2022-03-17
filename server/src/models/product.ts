import { Schema, model } from 'mongoose';

export interface Product {
  title: string;
  author: string;
  genre: string;
  read: boolean;
}

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  read: { type: Boolean, required: true }
});

export const ProductModel = model<Product>('Product', productSchema);

