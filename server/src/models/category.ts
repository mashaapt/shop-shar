import { Schema, model } from 'mongoose';
import { Category } from '../../../common/models/category';

// const cat: Category = {
//   parent: 'Латексные шары',
//   child: 'Без рисунка'
// }

// const cat2: Category = {
//   parent: 'Латексные шары',
//   child: 'С рисунком'
// }

const categorySchema = new Schema<Category>({
  parent: { type: String, required: true },
  child: { type: String, required: true }  
});

export const CategoryModel = model<Category>('Category', categorySchema);

