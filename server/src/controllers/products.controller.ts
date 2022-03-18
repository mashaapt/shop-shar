import 'reflect-metadata';
import { Product, ProductModel } from '../models/product';
import { Body, Get, JsonController, Param, Post, UseInterceptor } from 'routing-controllers';
import { MongoInterceptor } from '../middleware/mongoose-middleware';

@JsonController('/api/products')
@UseInterceptor(MongoInterceptor)
export class ProductsController {

    @Get('/:productId')
    getProduct(@Param('productId') productId: string) {
        return ProductModel.findById(productId).exec();
    }
    
    @Get()
    getAllProducts() {

    }

    @Post()
    addProduct(@Body() product: Product) {

        const productModel = new ProductModel<Product>(product);

        console.log('adding product: ', product)

        return true;
    }

}