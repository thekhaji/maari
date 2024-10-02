import Errors from "../libs/Errors";
import {Response, Request} from "express";
import { T } from "../libs/types/common";
import { Message } from "../libs/Errors";

const productController: T = {};
productController.getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("getAllProducts");
        res.render("products");
    } catch (err) {
        console.log("Error, getAllProducts:", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_RONG;
        res.send(`<script> alert("${message}"); window.location.replace('admin/login)</script>`);
    }
}

productController.createNewProduct = async (req: Request, res: Response) => {
    try {
        console.log("createNewProduct");
        res.send("DONE!");
    } catch (err) {
        console.log("Error, createNewProduct:", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_RONG;
        res.send(`<script> alert("${message}"); window.location.replace('admin/login)</script>`);
    }
}

productController.updateChosenProduct = async (req: Request, res: Response) => {
    try {
        console.log("updateChosenProduct");
        
    } catch (err) {
        console.log("Error, updateChosenProduct:", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_RONG;
        res.send(`<script> alert("${message}"); window.location.replace('admin/login)</script>`);
    }
}
export default productController;