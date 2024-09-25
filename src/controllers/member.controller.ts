import { T } from "../libs/types/common";
import {Response, Request} from "express";

const memberController: T = {};

memberController.goHome = (req: Request, res: Response) => {
    try {
        res.send("Home Page");
    } catch (err) {
        console.log("Err, goHome:", err);
    }
}

memberController.getLogin = (req: Request, res: Response) => {
    try {
        res.send("Login Page");
    } catch (err) {
        console.log("Err, getLogin:", err);
    }
}

memberController.getSignup = (req: Request, res: Response) => {
    try {
        res.send("Signup Page");
    } catch (err) {
        console.log("Err, getSignup:", err);
    }
}

export default memberController;