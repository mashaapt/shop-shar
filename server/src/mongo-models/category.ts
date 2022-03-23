import { Schema, model } from 'mongoose';
import { Category } from '../../../common/interfaces/category.interface';


const categorySchema = new Schema<Category>({
  parent: { type: String, required: true },
  child: { type: String, required: true }  
});

export const MongoCategory = model<Category>('Category', categorySchema);


// const cat: Category = {
//   parent: 'Латексные шары',
//   child: 'Без рисунка'
// }

// const cat2: Category = {
//   parent: 'Латексные шары',
//   child: 'С рисунком'
// }