import 'reflect-metadata';
import { MongoProduct } from '../mongo-models/product';
import { Body, Delete, Get, JsonController, Param, Post, Put, UseInterceptor } from 'routing-controllers';
import { MongoInterceptor } from '../middleware/mongoose-middleware';
import { Product } from '../../../common/interfaces/product.interface';


@JsonController('/api/products')
@UseInterceptor(MongoInterceptor)
export class ProductsController {

    @Get('/:productId')
    getProduct(@Param('productId') productId: string) {
        return MongoProduct.findById(productId).exec();
    }

    @Get()
    async getAllProducts() {
        const result = await MongoProduct.find().exec();

        return result;
    }

    @Post()
    async addProduct(@Body() product: Product) {

        const productModel = new MongoProduct<Product>(product);
        const result = await productModel.save();
        // console.log('adding product: ', product)

        return result._id.toString();

    }

    @Put()
    async editProduct(@Body() product: Product) {
        const result = await MongoProduct.updateOne({ _id: product._id }, product)

        return result;
    }

    @Delete('/:productId')
    async deleteProduct(@Param('productId') productId: string) {
        const product = await this.getProduct(productId);

        if (product) {
            await product.delete();
            return true;
        }
    }

}