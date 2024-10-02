import Errors, { HttpCode } from "../libs/Errors";
import {Response, Request} from "express";
import { T } from "../libs/types/common";
import { Message } from "../libs/Errors";
import { AdminRequest } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";
import ProductService from "../models/Product.service";

const productController: T = {};
const productService = new ProductService();

productController.getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("getAllProducts");
        const data = await productService.getAllProducts();
        console.log("data:",data);
        
        res.render("products", {products: data});
    } catch (err) {
        console.log("Error, getAllProducts:", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_RONG;
        res.send(`<script> alert("${message}"); window.location.replace('admin/login')</script>`);
    }
}

productController.createNewProduct = async (req: AdminRequest, res: Response) => {
    try {
        console.log("createNewProduct");
        if(!req.files?.length)
            throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

        const data: ProductInput = req.body;
        data.productImages = req.files?.map((ele)=>{
            return ele.path.replace(/\\/g, "/");
        });

        await productService.createNewProuct(data);

        res.send(`
        <script> alert("Created Sucessffully!"); window.location.replace('admin/product/all')</script>    
        `);
    } catch (err) {
        console.log("Error, createNewProduct:", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_RONG;
        res.send(`<script> alert("${message}"); window.location.replace('admin/product/all')</script>`);
    }
}

productController.updateChosenProduct = async (req: Request, res: Response) => {
    try {
        console.log("updateChosenProduct");
        const id = req.params.id;
        
        const result = await productService.updateChosenProduct(id, req.body);

        res.status(HttpCode.OK).json({data: result});
    } catch (err) {
        console.log("Error, updateChosenProduct:", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_RONG;
        res.send(`<script> alert("${message}"); window.location.replace('admin/login')</script>`);
    }
}
export default productController;