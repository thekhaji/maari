import { ProductCollection, ProductStatus } from "../enums/product.enum";
import {ObjectId} from "mongoose";

export interface Product{
    _id: ObjectId;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productDesc?: string;
    productImages: string[];
    productViews: number;
    productDiscount: number;
}

export interface ProductInput{
    productStatus?: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
    productDiscount?: number;
}

export interface ProductUpdateInput{
    _id: ObjectId;
    productStatus?: ProductStatus;
    productCollection?: ProductCollection;
    productName?: string;
    productPrice?: number;
    productLeftCount?: number;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
    productDiscount?: number;
}