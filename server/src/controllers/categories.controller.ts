import 'reflect-metadata';
import { CategoryModel } from '../models/category';
import { Body, Delete, Get, JsonController, Param, Post, UseInterceptor } from 'routing-controllers';
import { MongoInterceptor } from '../middleware/mongoose-middleware';
import { Category } from '../../../common/models/category'

@JsonController('/api/categories')
@UseInterceptor(MongoInterceptor)
export class CategoriesController {

  @Get('/:categoryId')
  getCategory(@Param('categoryId') categoryId: string) {
    return CategoryModel.findById(categoryId).exec();
  }

  @Get()
  getAllCategories() {
    return CategoryModel.find({}).exec();
  }

  @Post()
  async addCategory(@Body() category: Category) {

    const categoryModel = new CategoryModel<Category>(category);
    const result = await categoryModel.save();

    return result._id.toString();
  }

  @Delete('/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    
    const category = await this.getCategory(categoryId);

    if (category) {
      await category.delete();
      return true;
    }

    throw new Error(`Category with id ${categoryId} not found`);
  }
  

}