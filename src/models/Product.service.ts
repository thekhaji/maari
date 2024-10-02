import Errors from "../libs/Errors";
import { Product, ProductInput, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";
import { shapeIntoMongooseObject } from "../libs/config";

class ProductService{
    private readonly productModel;

    constructor(){
        this.productModel = ProductModel;
    }

    /** SPA **/


    /** SSR **/
    public async getAllProducts(): Promise<Product[]>{
        const result = this.productModel.find().exec();
        if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        
        return result;
    }

    public async createNewProuct(input: ProductInput): Promise<Product>{
        try {
            return await this.productModel.create(input);
        } catch (err) {
            console.log("Error, model:createNewProuct", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async updateChosenProduct(id: string, input: ProductUpdateInput): Promise<Product>{
        id = shapeIntoMongooseObject(id);
        const result = this.productModel.findOneAndUpdate({_id: id}, input, {new: true}).exec();
        if(!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        
        return result;
    }
}

export default ProductService;
