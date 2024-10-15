import Errors from "../libs/Errors";
import { Product, ProductInput, ProductInquiry, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";
import { shapeIntoMongooseObject } from "../libs/config";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";
import {ObjectId} from "mongoose";

class ProductService{
    private readonly productModel;

    constructor(){
        this.productModel = ProductModel;
    }

    /** SPA **/
    public async getProducts(inquiry: ProductInquiry): Promise<Product[]>{
        const match: T = {productStatus: ProductStatus.PROCESS} ;
        
        if(inquiry.productCollection) match.productCollection = inquiry.productCollection;
        if(inquiry.search) match.productName = { $regex: new RegExp(inquiry.search, "i") };

        const sort: T = inquiry.order === "productPrice" ?
            {[inquiry.order]: 1} : {[inquiry.order]: -1};
        
        const result = await this.productModel.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: (inquiry.page*1-1)*inquiry.limit},
            {$limit: inquiry.limit*1 },
        ]).exec() ;

        if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        
        return result;
    }

    public async getProduct(memberId: ObjectId | null, id: string): Promise<Product>{
        const productId = shapeIntoMongooseObject(id);

        let result = await this.productModel.findOne({_id: productId, productStatus: ProductStatus.PROCESS}).exec();

        if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        // if (memberId){
        //     //Check view log existence
        //     const input: ViewInput = {
        //         memberId: memberId,
        //         viewRefId: productId,
        //         viewGroup: ViewGroup.PRODUCT, 
        //     };
        //     const existView = await this.viewService.checkViewExistence(input);

            
        //     if(!existView){
        //         //Insert New View
        //         console.log("PLANNING TO INSERT NEW VIEW");
        //         await this.viewService.insertMemberView(input);
            
        //         //Increase Counts
        //         const result2 = await this.productModel.findByIdAndUpdate(productId, {$inc: {productViews: + 1}}, {new: true}).exec();
        //     }

            
        // }

        return result;
    }

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
